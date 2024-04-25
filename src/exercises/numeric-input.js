/*
 * Numeric Input Component
 *   HTML (initial state): <input type="text" class="c-numeric-input" />
 *   Requirement:
 *   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
 *   - if user enters leading zero, or .  when user moves focus away from the input, it should
 *     change to correct format:
 *       .1 ==> 0.1 and 01 => 1
 *   - if user enter invalid character/value, HTML should change to this
 *       <input type="text" class="c-numeric-input c-numeric-input--error" />
 *       <span class="c-numeric-input__error-msg">invalid input</span>
 *   - if user enter valid value and move focus away from the input HTML should change to this:
 *       <input type="text" class="c-numeric-input c-numeric-input--valid" />
 *   - if user focus on the input or user clear value from the input,
 *     HTML should return to initial stage
 *
 * Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
 * red or green border to the input
 * */

const NumericInput = {
  init: () => {
    document.querySelectorAll(".c-numeric-input").forEach((input) => {
      // Event listener for input focus
      input.addEventListener("focus", () => {
        input.classList.remove(
          "c-numeric-input--error",
          "c-numeric-input--valid"
        );
      });

      // Event listener for input blur
      input.addEventListener("blur", () => {
        const value = input.value.trim();
        if (value === "") {
          input.classList.remove(
            "c-numeric-input--error",
            "c-numeric-input--valid"
          );
          return;
        }
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue) && floatValue.toString() === value) {
          input.value = floatValue.toString(); // Remove leading zeros
          input.classList.remove("c-numeric-input--error");
          input.classList.add("c-numeric-input--valid");
        } else {
          input.classList.remove("c-numeric-input--valid");
          input.classList.add("c-numeric-input--error");
        }
      });

      // Event listener for input key press
      input.addEventListener("keypress", (event) => {
        const keyCode = event.keyCode;
        const charCode = String.fromCharCode(keyCode);
        const currentValue = input.value.trim();

        // Allow only numbers, dot, and minus sign
        if (
          !/^[\d.-]$/.test(charCode) ||
          (charCode === "." && currentValue.includes(".")) ||
          (charCode === "-" && currentValue !== "" && currentValue !== "-")
        ) {
          event.preventDefault();
        }
      });

      // Event listener for input key up
      input.addEventListener("keyup", () => {
        const value = input.value.trim();
        if (value === "") {
          input.classList.remove(
            "c-numeric-input--error",
            "c-numeric-input--valid"
          );
          return;
        }
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
          input.value = floatValue.toString(); // Remove leading zeros
          input.classList.remove("c-numeric-input--error");
          input.classList.add("c-numeric-input--valid");
        } else {
          input.classList.remove("c-numeric-input--valid");
          input.classList.add("c-numeric-input--error");
        }
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", NumericInput.init);
