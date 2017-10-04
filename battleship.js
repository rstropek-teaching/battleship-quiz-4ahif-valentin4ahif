$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {

    var ships=[];
    //window.alert(ships.length);
    ships=buildShip(5);
    //ships.concat(buildShip(4));
    //window.alert(ships.length);
    /*buildShip(3);
    buildShip(4);
    buildShip(5);*/
    printShip(ships);

    //The random place gets calculated
    function buildShip(length){
      var count=0;
      var coords=[];
      var routine=0; //This variable defines the routine, which gets used to calculate the next point
      
      do{
        if(count===0){ //count===0 means, a new ship gets placed
          //window.alert(`count===0`);
          coords[count]=Math.floor((Math.random() * 10) + 0);
          coords[count+1]=Math.floor((Math.random() * 10) + 0);
        }else if(routine===0){ //if the random generated point is water, a routine gets declared
          //I know this is not a good way and there surely are better solutions, but I can't think of one at the time.
          //routine===1: x-coordinate gets increased
          //routine===2: x-coordinate gets decreased
          //routine===3: y-coordinate gets increased
          //routine===4: y-coordinate gets decreased
          //window.alert(`count>0, routine gets calced`);
          routine=Math.floor((Math.random()*5)+1);
        }

        switch(routine){
          case 1:
            //window.alert(`routine1`);
            coords[count]=(coords[count-2]+1);
            window.alert(coords[count]);
            coords[count+1]=coords[count-1];
            break;
          case 2:
          //window.alert(`routine2`);
            coords[count]=(coords[count-2]-1);
            window.alert(coords[count]);
            coords[count+1]=coords[count-1];
            break;
          case 3:
          //window.alert(`routine3`);
            coords[count]=coords[count-2];
            coords[count+1]=(coords[count-1]+1);
            window.alert(coords[count+1]);
            break;
          case 4:
          //window.alert(`routine4`);
            coords[count]=coords[count-2];
            coords[count+1]=(coords[count-1]-1);
            window.alert(coords[count+1]);
            break;
        }

        if((testCoords(coords[count], coords[count+1]))===0){ //0 means, place is free
          count=count+2;
          window.alert(`coordinate was water; counter gets increased`);
        }else{
          //window.alert(`coordinate was a ship; counter gets reseted`);
          count=0;
        }
        console.log(`b`);
      }while((count/2)!=length);

      //window.alert(`ship gets printed`);
      return coords;
      //printShip(coords);
    }

    //Prints the whole ship
    function printShip(coords){
      for(var i=0;i<coords.length;i++){
        $('td[data-r='+coords[i]+'][data-c='+coords[i+1]+']').removeClass('water').addClass('ship');
        i++;
      }
    }

    //Tests, if there is already a ship at this place 
    function testCoords(x, y){
      if(x<0||x>9||y<0||y>9) return 1;
      if(($('td[data-r='+x+'][data-c='+y+']').hasClass(`water`))) return 0;
      return 1;
    }
  });
});