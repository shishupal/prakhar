function addItem() {
  var counter = $("#myTable tr").length;

  var lastitemappend = `<tr class="lastItem">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>भाड़ा</td>
                            <td><input type="number" pattern="\\d*" id="fare" class="form-control" /></td>
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
                 <td><div class="autocomplete" style="width:300px;"><input  id=${"item"+counter} type="text" data-name=${"dtname"+counter} name="myCountry" placeholder="आइटम"></div></td>
                 <td> <input type="text" id=${"size"+counter} class="size" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" pattern="\\d*" id=${"quantity"+counter} class="quantity" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" pattern="\\d*" type="number" id=${"weight"+counter}  class="weight" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td> <input type="number" pattern="\\d*" type="number" id=${"rate"+counter} class="rate" data-name=${"dtname"+counter} class="form-control round"/></td>
                 <td class="totalcol"> <input type="number" id=${"total"+counter}  class="total" data-name=${"dtname"+counter} class="form-control round" disabled/></td>
                 <td class="print"><button type=\"button\"  class=\"btn btn-danger delItemrow\" data-name=${counter}>Delete</button></td> 
               </tr>`;

  $(".lastItem,.table-success").remove();
  $("#myTable tbody").append(cell1).append(lastitemappend);
  $(".additem").attr("disabled", true);
  if ($("#myTable tbody tr").length === 2) {
    $(".additem").removeAttr('disabled');
  }

  autocomplete(document.getElementById(`${"item"+counter}`), varity);
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

  /// in rate  operation
  $(document.body).on('blur', "#myTable td input.rate", function (e) {
    var txt = $(this).attr('data-name');
    var ratenumber = txt.match(/\d/g)[0];

    /*let item = $(`${"#myTable td input#item"+ratenumber}`).val();
    let result = item.match("^RHL");

    if(null!=result){
      weight = $(`${"#myTable td input#quantity"+ratenumber}`).val();
    }else {
      weight = $(`${"#myTable td input#weight"+ratenumber}`).val();
    }*/

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


});

window.addEventListener('load', function () {
  addItem();
  console.log("All item loaded");
});


