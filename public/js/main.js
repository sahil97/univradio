$(document).ready(function(){

  var tb = document.getElementById('tb')
  var table = document.getElementById('table1');


  $.ajax({url:"http://localhost:3030/api/getshows", success: function(result){
    console.log(result);
      for(var i=0;i<result.length;i++){

        var day = result[i].day;
        var st_time = result[i].st_time;
        var et_time = result[i].et_time;
        var host = result[i].host;
        var desc = result[i].desc;
        var time = st_time + "-" +et_time;
        var data = [time,desc,host];
        console.log(data);
        classlist=['show_time','show_name','host_name']
        var row = document.createElement('tr');
        for(var j=0; j<3;j++){
          var cell = document.createElement('td');
          var cellText = document.createTextNode(data[j]);
          cell.appendChild(cellText);
          cell.setAttribute('class',classlist[j]);
          row.appendChild(cell);
        }
        row.setAttribute('class','p_show');
        table.appendChild(row);
        // tb.classList.add("table-striped");

        // <tr class="p_show">
        //   <td class="show_time">14:00 - 16:00 </td>
        //   <td class="show_name"> Hello World </td>
        //   <td> ~ <span class="host_name">John Doe</span></td>
        // </tr>
      }
        }
  });


    $('#show_submit').on('click',(e)=>{
      console.log($('#date_input').val(),$('#time_input').val());
      const host = $('#name').val();
      const desc = $('#desc').val();
      const day = $('#date_input').val();
      const time = $('#time_input').val();
      const duration = $('#duration').val();
      console.log(host,desc,day,time,duration);
      if(host && desc && day && time ){
        let data = {host:host,desc:desc,time:time,date:day,dur:duration};
          // data = JSON.stringify(data);
            console.log(data);
            // $.ajax({
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
