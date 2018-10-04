handleNestedCompletion = (x) => {
    let complete = null
    let incomplete = null
    if(x === true){
        incomplete = false
        return incomplete
    } else if (nest.completed === false){
        complete = true
        return complete
    }
}

handleCompletion = (x) => {
    let complete = null
    let incomplete = null
    if(x === true){
        incomplete = false
        return incomplete
    } else if (x === false){
        complete = true
        return complete
    }
}


test('mark nested as incomplete',()=>{
    expect(handleNestedCompletion(true)).toBe(false)
})
test('mark nested as complete',()=>{
    expect(handleNestedCompletion(false)).toBe(true)
})
test('mark todo as complete',()=>{
    expect(handleCompletion(true)).toBe(false)
})
test('adds nested',()=>{
    expect(handleCompletion(false)).toBe(true)
})
test('deletes nested',()=>{})


