for(let i=1;i<5;i++){
    setTimeout(()=>{
        console.log([I])
    },1000)
}//1,2,3,4,5

for(var i=1;i<5;i++){
    setTimeout(()=>{
        console.log(i)
    },1000)//undefied
}DATABASE_URL=postgresql://postgres:root@localhost:5432/nailbatting
