function addItem() {
  var counter = $("#myTable tr").length;

  var lastitemappend = `<tr class="lastItem">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>भाड़ा</td>
                            <td><input type="number" id="fare" class="form-control" /></td>
                            <td></td>
                        </tr>
                        <tr class="table table-success">
                            <th></th>
                            <th></th>
                            <th>कुल वज़न</th>
                            <th><input type="number" id="netWeight" class="form-control" disabled/></th>
                            <th>कुल राशि</th><th><input type="number" id="netAmount" class="form-control netAmount" disabled/></th>
                            <th></th>
                        </tr>`;

  var cell1 = `<tr class=${"insertafter"+counter}>
                 <td><div class="autocomplete" style="width:300px;"><input id="myInput" id=${"item"+counter} type="text" data-name=${"dtname"+counter} name="myCountry" placeholder="आइटम"></div></td>
                 <td> <input type="text" id=${"size"+counter} class="size" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" id=${"quantity"+counter} class="quantity" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" type="number" id=${"weight"+counter}  class="weight" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" type="number" id=${"rate"+counter} class="rate" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td class="totalcol"> <input type="number" id=${"total"+counter}  class="total" data-name=${"dtname"+counter} class="form-control round" disabled/></td>
                 <td class="print"><button type=\"button\"  class=\"btn btn-danger delItemrow\" data-name=${counter}>Delete</button></td> 
               </tr>`;

  $(".lastItem,.table-success").remove();
  $("#myTable tbody").append(cell1).append(lastitemappend);
  $(".additem").attr("disabled", true);
  if ($("#myTable tbody tr").length === 2) {
    $(".additem").removeAttr('disabled');
  }

  var varity = ["Angle",
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
  autocomplete(document.getElementById("myInput"), varity);
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
  $(document.body).on('blur', "#myTable td input.rate, #myTable td input.quantity", function (e) {
    var txt = $(this).attr('data-name');
    var ratenumber = txt.match(/\d/g)[0];

    alert($(`${"#myTable td input#item"+ratenumber}`).val());

    if(true){

    }
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
 $(document.body).on('blur', "#fare, table td", function (e) {

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


