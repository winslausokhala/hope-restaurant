/* ==========================================================================
   Hope: booking and contact forms
   - Validates on the page and shows a clear message under each field
   - Sends the form to the Formspree address in js/config.js
   - If no address is set yet, opens the visitor's email app with the message ready
   ========================================================================== */
(function () {
  "use strict";

  var S = window.HOPE || {};
  var B = S.booking || {};
  var forms = document.querySelectorAll("form[data-form]");
  if (!forms.length) return;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function isoDate(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  var today = isoDate(new Date());

  /* ---------- Fill the booking options ---------- */
  var dateInput = document.getElementById("date");
  if (dateInput) {
    var last = new Date();
    last.setDate(last.getDate() + (B.daysAhead || 180));
    dateInput.min = today;
    dateInput.max = isoDate(last);
  }

  var timeSelect = document.getElementById("time");
  if (timeSelect) {
    var toMinutes = function (hhmm) {
      var parts = hhmm.split(":");
      return Number(parts[0]) * 60 + Number(parts[1]);
    };
    var step = B.stepMinutes || 30;
    for (var m = toMinutes(B.firstSlot || "11:00"); m <= toMinutes(B.lastSlot || "21:30"); m += step) {
      var label = pad(Math.floor(m / 60)) + ":" + pad(m % 60);
      timeSelect.appendChild(new Option(label, label));
    }
  }

  var guestSelect = document.getElementById("guests");
  if (guestSelect) {
    for (var g = 1; g <= (B.maxGuests || 12); g++) {
      guestSelect.appendChild(new Option(g + (g === 1 ? " guest" : " guests"), String(g)));
    }
  }

  /* ---------- Validation rules: return an error message, or "" when the value is fine ---------- */
  var rules = {
    name: function (v) {
      return v.trim().length < 2 ? "Enter your name." : "";
    },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter an email address like name@example.com.";
    },
    phone: function (v) {
      var digits = v.replace(/\D/g, "");
      return digits.length >= 7 && /^[\d\s()+\-.]+$/.test(v.trim())
        ? ""
        : "Enter a phone number with at least 7 digits.";
    },
    date: function (v) {
      if (!v) return "Choose a date.";
      return v < today ? "Choose today or a later date." : "";
    },
    time: function (v) {
      return v ? "" : "Choose a time.";
    },
    guests: function (v) {
      return v ? "" : "Choose the number of guests.";
    },
    message: function (v) {
      return v.trim().length < 5 ? "Write a short message so we know how to help." : "";
    }
  };

  function errorBox(field) {
    return document.getElementById(field.id + "-error");
  }

  function setError(field, message) {
    var box = errorBox(field);
    if (!box) return;
    if (message) {
      box.textContent = message;
      box.hidden = false;
      field.setAttribute("aria-invalid", "true");
    } else {
      box.textContent = "";
      box.hidden = true;
      field.removeAttribute("aria-invalid");
    }
  }

  function check(field) {
    var rule = rules[field.name];
    if (!rule) return true;
    var message = rule(field.value);
    setError(field, message);
    return !message;
  }

  /* ---------- Messages ---------- */
  function say(box, kind, title, lines) {
    box.className = "form-status form-status--" + kind;
    box.hidden = false;
    var nodes = [];
    var heading = document.createElement("p");
    heading.className = "form-status-title";
    heading.textContent = title;
    nodes.push(heading);
    lines.forEach(function (line) {
      var p = document.createElement("p");
      p.textContent = line;
      nodes.push(p);
    });
    box.replaceChildren.apply(box, nodes);
    box.focus();
  }

  function longDate(value) {
    var parts = value.split("-");
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------- Sending ---------- */
  function send(kind, data) {
    if (S.formEndpoint) {
      return fetch(S.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (response) {
        if (!response.ok) throw new Error("The form service returned " + response.status);
        return "sent";
      });
    }

    /* No form service yet: hand the message to the visitor's email app. */
    var lines = Object.keys(data)
      .filter(function (key) {
        return key.charAt(0) !== "_" && data[key];
      })
      .map(function (key) {
        return key.charAt(0).toUpperCase() + key.slice(1) + ": " + data[key];
      });
    window.location.href =
      "mailto:" + S.email + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    return Promise.resolve("mailto");
  }

  Array.prototype.forEach.call(forms, function (form) {
    var kind = form.dataset.form;
    var status = form.querySelector(".form-status");
    var button = form.querySelector('button[type="submit"]');
    var fields = Array.prototype.filter.call(form.elements, function (el) {
      return rules[el.name];
    });

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field.value !== "") check(field);
      });
      field.addEventListener("input", function () {
        if (field.hasAttribute("aria-invalid")) check(field);
      });
      field.addEventListener("change", function () {
        if (field.hasAttribute("aria-invalid")) check(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.hidden = true;

      var firstBad = null;
      fields.forEach(function (field) {
        if (!check(field) && !firstBad) firstBad = field;
      });
      if (firstBad) {
        firstBad.focus();
        return;
      }

      /* Spam trap: real visitors never see or fill this field. */
      var trap = form.elements._gotcha;
      if (trap && trap.value) return;

      var data = {};
      fields.forEach(function (field) {
        data[field.name] = field.value.trim();
      });
      if (form.elements.notes) data.notes = form.elements.notes.value.trim();

      data._subject =
        kind === "booking"
          ? "Booking request from " + data.name + " for " + data.guests + " on " + data.date + " at " + data.time
          : "Website message from " + data.name;

      var original = button.textContent;
      button.disabled = true;
      button.textContent = "Sending...";

      send(kind, data)
        .then(function (mode) {
          var lines = [];
          if (mode === "mailto") {
            lines.push("Your email app should now be open with your message ready. Press send in your email app to finish.");
            lines.push("If nothing opened, call us on " + S.phone + " instead.");
            say(status, "success", "One more step", lines);
          } else if (kind === "booking") {
            lines.push(
              "We have your request for " + data.guests + (data.guests === "1" ? " guest" : " guests") +
                " on " + longDate(data.date) + " at " + data.time + "."
            );
            lines.push("We will confirm your table by email or phone. If your plans change, call us on " + S.phone + ".");
            say(status, "success", "Thank you, " + data.name.split(" ")[0], lines);
          } else {
            lines.push("We will reply to " + data.email + " as soon as we can.");
            say(status, "success", "Message sent", lines);
          }
          form.reset();
        })
        .catch(function (error) {
          console.error(error);
          say(status, "error", "That did not send", [
            "Check your connection and try again, or call us on " + S.phone + "."
          ]);
        })
        .then(function () {
          button.disabled = false;
          button.textContent = original;
        });
    });
  });
})();
