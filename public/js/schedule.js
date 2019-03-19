$(document).ready(function(){

  const tb = document.getElementById('tb')
  const table = document.getElementById('table_body');
  var day = location.search.split('day=')[1]
  console.log(day);
  var weeklinks=$(".weeklink");
  for(var i=0;i<weeklinks.length;i++){
    if(weeklinks[i].innerHTML.includes(day)){
      weeklinks[i].classList.add("selected");
    }
  }
  // console.log(weeklinks);

  $.ajax({url:"http://localhost:3030/api/getshows", success: function(result){
    // console.log(moment.unix(result[0].day).add(2, 'h').format("HH:mm"));
    // console.log(result);
      for(var i=0;i<result.length;i++){

        var day = moment.unix(result[i].day).format("DD/MM/YYYY");
        var duration = result[i].duration;
        var start_time = moment.unix(result[i].day).format("HH:mm");
        var end_time = moment.unix(result[0].day).add(duration, 'h').format("HH:mm");
        var time = start_time + " - "+ end_time;
        var host = result[i].host;
        var desc = result[i].desc;
        // var time = st_time + "-" +et_time;
        var data = [day,time,desc,host];
        console.log(data);
        classlist=['show_day','show_time','show_name','host_name']
        var row = document.createElement('tr');
        for(var j=0; j<4;j++){
          var cell = document.createElement('td');
          var cellText = document.createTextNode(data[j]);
          cell.appendChild(cellText);
          // cell.setAttribute('class',classlist[j]);
          row.appendChild(cell);
        }
        // row.setAttribute('class','p_show');
        table.appendChild(row);
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
        var epoch = moment(String(day) +" " +String(time),"YYYY-MM-DD HH:mm").unix();
        console.log(host,desc,epoch,duration);
        if(host && desc && epoch && time ){
          let data = {host:host,desc:desc,date:epoch,dur:duration};
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

});
