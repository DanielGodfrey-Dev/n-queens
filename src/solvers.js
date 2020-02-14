/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.findNRooksSolution = function(n) {
  var solution = undefined;

  var matrix = makeEmptyMatrix(n);

  for (var i = 0; i < n; i++) {
    matrix[i][i] = 1;
  }

  solution = matrix;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
  };

  var solutionCount = factorial(n);

  //n! counts of the fact that we can ignore any spaces that cannot be filled
  //on the next row lookup. We have proved this mathematically :p


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board(makeEmptyMatrix(n));

  if (n === 0) {
    return [];
  }

  if (n === 1) {
    return [[1]];
  }

  // if (n === 2 || n === 3) {
  //   return null;
  // }

  //!!!
  //need to use correct syntax and variables/function calls on below
  //!!!

  var firstRow = board.get(0);
  //create a function that checks if placed piece has any conflicts on next row
  var checkElement = function(row) {
    // iterate over first row
    for (i = 0; i < row.length; i++) {
      row[i] = 1;
      // set space to 1
      // if queen conflict
      if (this.hasAnyQueenConflictsOn(row, i)) {
        // set space back to zero
        row[i] = 0;
      } else {
      // if no queen conflicts
        if (i + 1 !== n) {
        //if next row index is not n
          board.checkElement(i + 1);
          //call recurs with next row index
        } else {
          return board;
        }

        // else return matrix
      }
}

    checkElement(firstRow);
  };

  // at element, set to 1
  // if queen conflict is false
  // iterate over next row



  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
  // return board;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
