function addItem() {
  var counter = $("#myTable tr").length;

  var lastitemappend = `<tr class="lastItem"><td></td><td></td><td></td><td></td><td>भाड़ा</td><td><input type="text" id="fare" class="form-control" /></td><td></td></tr>
    <tr class="table table-success">
  <th></th><th></th><th>कुल वज़न</th><th><input type="text" id="netWeight" class="form-control" disabled/></th>
  <th>कुल राशि</th><th><input type="text" id="netAmount" class="form-control netAmount" disabled/></th><th></th>
</tr>`;



  var cell1 = `<tr class=${"insertafter"+counter}><td>
 <div class="autocomplete" style="width:300px;">
 <input id="myInput" type="text" name="myCountry" placeholder="आइटम"></div></td>
 <td> <input type="text" id=${"size"+counter} class="form-control"/></td><td> <input type="text" id=${"quantity"+counter} class="quantity" data-name=${"dtname"+counter} class="form-control round"/></td>
<td> <input type="text" id=${"weight"+counter}  class="weight" data-name=${"dtname"+counter} class="form-control round"/></td>
 <td> <input type="text" id=${"rate"+counter} class="rate" data-name=${"dtname"+counter} class="form-control round"/></td>
  <td class="totalcol"> <input type="text" id=${"total"+counter}  class="total" data-name=${"dtname"+counter} class="form-control round" disabled/></td><td class="print">
 <button type=\"button\"  class=\"btn btn-danger delItemrow\" data-name=${counter}>Delete Item</button></td> </tr>`;

  //$("#myTable tbody").append(cell1).append(lastitemappend);
  $(".lastItem,.table-success").remove();
  $("#myTable tbody").append(cell1).append(lastitemappend);
  $(".additem").attr("disabled", true);
  if ($("#myTable tbody tr").length === 2) {

    $(".additem").removeAttr('disabled');
  }



  var countries = ["Angle",
    "Angle 1x1",
    "Angle 11/4x1",
    "Angle 35x5",
    "Angle 40x5",
    "Angle 40x6",
    "Angle 50x5",
    "Angle 50x6",
    "Angle 65x5",
    "Angle 65x6",
    "Patti",
    "Patti 3/4 x 11/4",
    "Patti 3/4 x 11/2",
    "Patri 1x1",
    "Patri 1x2",
    "Saria",
    "Pipe Tata",
    "Pipe JDS",
    "Pipe लोकल",
    "Ring",
    "Square",
    "Square 2 सूत",
    "Square 21/2सूत",
    "Square 3 सूत",
    "Square 4 सूत",
    "Square 5 सूत",
    "Tak 21/2 सूत",
    "Tak 2 सूत",
    "Round",
    "Round 2 सूत",
    "Round 5 सूत",
    "Z",
    "T",
    "Sheet",
    "Sheet नालीदार",
    "304 1/2 इंच Square",
    "304 रेगुलर Square",
    "304 1/2 इंच Round",
    "304 रेगुलर Round",
    "202 1/2 इंच Square",
    "202 रेगुलर Square",
    "202 1/2 इंच Round",
    "202 रेगुलर Round",
    "RHL 8mm",
    "RHL 10mm",
    "RHL 12mm",
    "RHL 16mm",
    "RHL 20mm",
    "RHL 22mm",
    "RHL 25mm",
    "Jindal 600fe 8mm",
    "Jindal 600fe 10mm",
    "Jindal 600fe 12mm",
    "Jindal 600fe 16mm",
    "Jindal 600fe 20mm",
    "Jindal 600fe 22mm",
    "Jindal 600fe 25mm",
    "Wire लोकल",
    "Wire RHL",
    "Jaali",
    "H/W 202",
    "H/W 304"
  ];
  autocomplete(document.getElementById("myInput"), countries);
}

function grandTotalAmt(grandTotal) {
  var totalwithoutfilter = grandTotal;
  var grandTotalAmt = totalwithoutfilter.filter(col => col);
  grandTotalAmt = grandTotalAmt.reduce((a, b) => Number(a) + Number(b), 0);
  console.log(grandTotalAmt);
  return grandTotalAmt;
}



function grandTotalwight(totalweightitem) {
  var totalwithoutfilter = totalweightitem;
  var totalweightitem1 = totalwithoutfilter.filter(col => col);
  totalweightitem1 = totalweightitem1.reduce((a, b) => Number(a) + Number(b), 0);
  console.log(totalweightitem1,"totalweightitem1");
  return totalweightitem1;
}

function printfn() {
  $(".print").hide();
  window.print();
  $(".print").show();

}

function netEstimate() {
  console.log("Clicked ")
  $("table").change(function () {
    var theTotal = 0;
    $("td:nth-child(4)").each(function () {
      var val = $(this).text();
      console.log(val)
      theTotal += parseInt(val);
      console.log(theTotal)
    });
  });
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  var inp = inp;
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

$(document).ready(function () {
  var weight = 0;
  var rate = 0
  var total = 0;
  var grandTotal = [];
  var totalweightitem=[];
  

  var fare = 0;
  $(document.body).on('blur', "#myTable td input.weight", function (e) {
    var txt = $(this).attr('data-name');
    var weightnumber = txt.match(/\d/g)[0];
    rate = $(`${"#myTable td input#rate"+weightnumber}`).val();
    totalweightitem[weightnumber]= Number($(this).val());    
    if (rate != 'NaN' && rate.trim() != '') {
      total = parseFloat($(this).val()).toFixed(2) * parseFloat(rate).toFixed(2);
      $(`${"#myTable td input#total"+weightnumber}`).val(total.toFixed(2));
      grandTotal[weightnumber] = total.toFixed(2);
      console.log(grandTotal)

    }


    if ($(`${"#myTable td input#total"+weightnumber}`).val() > 0) {
      $(".additem").removeAttr('disabled');
    }

    e.preventDefault();
  });

    /// in rate  opertaion
  $(document.body).on('blur', "#myTable td input.rate", function (e) {
    var txt = $(this).attr('data-name');
    var ratenumber = txt.match(/\d/g)[0];
    weight = $(`${"#myTable td input#weight"+ratenumber}`).val();

    if (weight != 'NaN' && weight.trim() != '') {
      total = parseFloat($(this).val()).toFixed(2) * parseFloat(weight).toFixed(2);
      $(`${"#myTable td input#total"+ratenumber}`).val(total.toFixed(2));
      grandTotal[ratenumber] = total.toFixed(2);
      console.log(grandTotal);

    }

    if ($(`${"#myTable td input#total"+ratenumber}`).val() > 0) {
      $(".additem").removeAttr('disabled');
    }


    e.preventDefault();
  });

// Grand total click
  $(document.body).on('click', ".grandTotalAmt", function (e) {
    var grandTotalAmt1 = grandTotalAmt(grandTotal) + Number($('#fare').val())
    $("#netAmount").val(grandTotalAmt1.toFixed(2));

    var totalwight=  grandTotalwight(totalweightitem);
    $("#netWeight").val(totalwight.toFixed(2));
    e.preventDefault();
  });


  
  
  // delte Row
  $(document.body).on('click', ".delItemrow", function (e) {

    console.log("hello del");
    grandTotal[$(this).attr('data-name')] = 0

    totalweightitem[$(this).attr('data-name')]= 0;

    $(this).parents('tr').remove();
    var grandTotalAmt1 = grandTotalAmt(grandTotal) + Number($('#fare').val())
    $("#netAmount").val(grandTotalAmt1.toFixed(2));

    var totalwight=  grandTotalwight(totalweightitem);
    $("#netWeight").val(totalwight.toFixed(2));



    e.preventDefault();
  });

 // delte Row
 $(document.body).on('blur', "#fare", function (e) {

  var grandTotalAmt1 = grandTotalAmt(grandTotal);
  
  var fareamount = grandTotalAmt1+ Number($('#fare').val());

  $("#netAmount").val(fareamount.toFixed(2));

  var totalwight=  grandTotalwight(totalweightitem);
  $("#netWeight").val(totalwight.toFixed(2));

  e.preventDefault();
});


});

window.addEventListener('load', function () {
  addItem();
  console.log("All item loaded");
});


