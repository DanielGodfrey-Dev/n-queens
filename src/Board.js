// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    checkConflict: function (array) {
      //checkConflict will check a row or column for two pieces in conflict
      var counter = 0;

      for (var i = 0; i < array.length; i++) {
        if (array[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }

      return false;
    },

    hasRowConflictAt: function(rowIndex) {

      this.checkConflict(this.get(rowIndex));

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        if (this.checkConflict(rows[i])) {
          return true;
        }
      }

      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var column = [];
      var rows = this.rows();

      for (var i = 0; i < rows.length; i++) {
        column.push(rows[i][colIndex]);
      }

      return this.checkConflict(column);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n'); //number of columns based on n in Board

      while (n > 0) {
        if (this.hasColConflictAt(n - 1)) {
          return true;
        }
        n--;
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    checkDiagonalConflict: function(conflictsArray){
      // declare count
      var count = 0;
      // iterate over CC array
      for (var j = 0; j < conflictsArray.length; j++) {
        // if board space at current coordinate has a piece
        if (this.get(conflictsArray[j][0])[conflictsArray[j][1]] === 1) {
          count++;
        }
      }
      // if count is more than 1
      // return true
      // else
        // return false
        if (count > 1) {
          return true;
        }

        return false;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // set var MDCI => arg
      var MDCI = majorDiagonalColumnIndexAtFirstRow;
      var n = this.get('n');
      // declare conflictingCOOR array

      var CC = [];

      // iterate from 0 to N
      for (var i = 0; i < n; i++) {
        // declare var x = MCDI + current N
        var x = MDCI + i;
        // declare var y = x + 1
        var y = x - MDCI;
        // add to conflictingCOOR arry ( x , y )
        if (x >= 0 && x < n) {
          CC.push([x, y]);
        }
      }
      return this.checkDiagonalConflict(CC);

    },
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      // iterate from (2 - n) to (n - 2)
      for (var greek = (2 - n); greek <= (n - 2); greek++) {
          //  if hasMRCat passing in current n element is true
        if (this.hasMajorDiagonalConflictAt(greek)) {
            // return true
            return true;
        }
      }

      // return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // set var MDCI => arg
      // declare conflictingCOOR array

      // iterate from var i = 0 to MDCI, inclusive
        // x is i
        // y is MDCI - i
        // add to CC (x, y)

      // return checkDiagonalConflicts passing in CC
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate from 1 to (2(n-1)-1)
        // if hasMinorDiagonalConflictAt passed in element is true
          //reutrn true
      // return false
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
