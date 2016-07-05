$(document).ready(function() {
  var $search = $('#search');
  var $input = $('#input');
  var $close = $('#close');
  var searchOn = false;
  
  $input.hide();
  $close.hide();

  //displaying search input field and search for entry typed into the input field
  $search.on('click', function() {
    if (!searchOn) {
      $close.show();
      $input.animate({
        width: 'show'
      });
      $input.focus();
      searchOn = true;
    } else {
      searchEntry();
      searchOn = false;
     }
  });

  //empty and hide search field 
  //hide close button
  $close.on('click', function() {
    $input.val('');
    $(this).hide();
    $input.animate({
      width: 'hide'
    });
    searchOn = false;
  });

  //input field empties any previous entries if user clicks in it 
  $input.focus(function() {
    $input.val('');
  });

  /* ************************** 
  NOTE TO SELF: CHECK THIS FUNCTION - NOT WORKING IN SOME BROWSERS
  ***************************/
  $input.bind('enter', function() {
    searchEntry();
  });

  //searches for phrases/words typed by the user in the input field
  function searchEntry() {
    var searchedItem = $input.val();
    var $results = $('#results-section');
    //link to wikipedia API 
    //will search for 10 results (limit in the link is set to 10)
    var link = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchedItem + '&limit=10&format=json&callback=?';
    $.getJSON(link, function(json) {
      var title = json[1];
      var article = json[2];
      var url = json[3];

      //msg will be filled with 10 entries (limit was set to 10)
      //the order of filling: title 1 + article 1; title 2 + article 2; etc
      var msg = '';
      var limit = title.length;
      for (i = 0; i < limit; i++) {
        msg += '<a href="' + url[i] + '" target="_blank">';
        msg += '<div class="result-box">';
        msg += '<h2>' + title[i] + '</h2>';
        msg += '<p>' + article[i] + '</p>';
        msg += '</div>';
        msg += '</a>';
      };
      //msg will go to the results section
      $results.html(msg);
    });
  };

  $input.keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $(this).trigger('enter');
    }
  });
});