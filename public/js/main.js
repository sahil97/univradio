$(document).ready(function(){

  var tb = document.getElementById('tb')
  var table = document.getElementById('table');


  $.ajax({url:"http://localhost:3030/api/getshows", success: function(result){

      for(var i=0;i<result.length;i++){

        var day = result[i].day;
        var time = result[i].time;
        var host = result[i].host;
        var desc = result[i].desc;
        var data = [day,time,host,desc];
        // console.log(data);

        var row = document.createElement('tr');
        for(var j=0; j<4;j++){
          var cell = document.createElement('td');
          var cellText = document.createTextNode(data[j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        table.appendChild(row);
        tb.classList.add("table-striped");
      }
        }
  });


    $('#date_submit').on('click',(e)=>{
      console.log($('#date_input').val(),$('#time_input').val());
      const host = $('#name').val();
      const desc = $('#desc').val();
      const day = $('#date_input').val();
      const time = $('#time_input').val();
      if(host && desc && day && time ){
        let data = {host:host,desc:desc,time:time,day:day};
          // data = JSON.stringify(data);
            console.log(data);
            $.ajax({
              url:"http://localhost:3030/api/newshow",
              type:"POST",
              "headers": {
                "Content-Type": "application/json"
              },
              dataType: 'json',
              processData: false,
              data: JSON.stringify(data),
              success: function(res){

                console.log("Created");
                console.log(res);
                alert("Added");
                window.location.reload();
              }
            })
        }
      else{
        alert("Please fill all fields to proceed.");
      }

});

    $('#add_click').on('click',(e)=>{
      // console.log("clicked add");
      var x = $('#add_dialog')[0];
      // console.log(x);
      if (x.style.display == "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    })


    $('#show_events').on('click',(e)=>{
      $('#tb').style.display = "block";
    })
});
