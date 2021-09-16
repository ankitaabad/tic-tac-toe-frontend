import {matrix} from './matrix';
enum win_type{
    ROW ="ROW",
    COLUMN ="COLUMN",
    DIAGONAL = "DIAGONAL",
    REVERSE_DIAGONAL = "REVERSE_DIAGONAL",   
}


const get_moves = (arr_moves) => arr_moves.map((ele) => matrix[ele]);

const arr_to_object_count = (arr: Array<number>) => {
    const obj = {}
    arr.forEach((ele) =>{
        const value = obj[ele] || 0;
        obj[ele] = value+1;
    });
    return obj;
}
const extract_column = (arr,col) => arr.map(ele => ele[col]);
const get_row = (arr) => extract_column(arr,'row');
const get_column = (arr) => extract_column(arr,'column');

const is_won = (arr_moves) =>{
    console.log("a_m",arr_moves);
    const moves = get_moves(arr_moves);
    return row_same(moves) || col_same(moves) || diagonal(moves) || reverse_diagonal(moves);
}
const row_same = (moves) =>{
    const rows = get_row(moves);
    const row = is_count_3(rows);
    if(row){
        return {
            type: win_type.ROW,
            index: row,
        }
    }
}
const col_same = (moves) =>{
    const cols = get_column(moves);
    const col = is_count_3(cols)
    if(col){
        return {
            type: win_type.COLUMN,
            index:col,
        }
    }
}

const diagonal = (moves) =>{
    const filtered_moves = moves.filter((obj) => obj.row === obj.column)
    if(filtered_moves.length === 3){
        return {
            type:win_type.DIAGONAL
        }
    }
}

const reverse_diagonal = (moves) =>{
    const filtered_moves = moves.filter((obj) => (obj.row + obj.column) ===4);
    if(filtered_moves.length === 3){
        return {
            type:win_type.REVERSE_DIAGONAL
        }
    }
}

const is_count_3 = (arr) =>{
    const count = arr_to_object_count(arr);
    const count_arr = Object.entries(count);
    for( let [index,count] of count_arr){
        if(count=== 3){
            return index
        }
    }
    return false;
}
// console.log(is_won([1,5,9]));

export {is_won}