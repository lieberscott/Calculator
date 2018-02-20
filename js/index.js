$(document).ready(function () {

  var arr = []; // arr to store all numbers and operations

  var i = 0; // iterate through array

  var item = ""; // number (4, 13, 288, 8999, etc.) being typed in

  var ans = ""; // when equals button is pressed

  var numbers = /[0-9\.]/; // all numbers and the literal dot
  var operations = /[-/\*\+]/; //minus, divide, mult, add

  $("td").on("click", function (event) {
    var clickedButton = $(event.target).html();

    if (clickedButton == "AC") {
      item = "";
      arr = [];
      i = 0;
      ans = "";
      $("#screen").html("0");
      $("#ops").html("&nbsp");
    }

    if (clickedButton == "CE") {
      item = "";
    }

    if (clickedButton.charCodeAt(0) == 215) {
      // &#215 (mult)
      clickedButton = "*";
    }

    if (clickedButton.charCodeAt(0) == 247) {
      // &#247 (div)
      clickedButton = "/";
    }

    if (operations.test(clickedButton)) {
      // OPERATIONS CLICK (except =)

      if (!ans == "" && arr.length == 0 && item.length == 0) {
        // first click after a prev ans
        arr[i] = ans; // prev ans becomes first item in array
        arr[i + 1] = clickedButton; // put operation into array
        i += 2;
      } else if (item.length == 0 && operations.test(arr[i - 1])) {
        arr[i - 1] = clickedButton; // override previous operation
      } else if (numbers.test(item)) {
        // if button clicked is operation and user has already typed in a numb
        arr[i] = item;
        arr[i + 1] = clickedButton;
        item = "";
        i += 2;
      }
    }

    if (numbers.test(clickedButton)) {
      // NUMBER CLICK (including .)
      if (item != "0" || clickedButton != "0") {
        // prevents multiple leading zeros
        item += clickedButton;
      }
    }

    if (clickedButton == "=") {
      // EQUALS CLICK
      arr.push(item);
      ans = eval(arr.join(""));
      $("#screen").html(ans);
      arr = [];
      item = "";
      i = 0;
    }

    if (arr.length == 0 && item.length == 0) {
      $("#ops").html("&nbsp"); // if ops is blank, have a blank space to prevent calc growing and shrinking
    } else {
      $("#ops").html(arr.join("") + item); // ops is everything in the array joined together
    }
  });
});