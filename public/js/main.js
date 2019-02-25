$(document).ready(function(){

  var tb = document.getElementById('tb')
  var table = document.getElementById('table');

  $.ajax({url:"http://localhost:"+process.env.PORT+"/api/getshows"`, success: function(result){

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


});
