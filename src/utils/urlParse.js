export default (name='') => {
    let url=location.href;
    let obj={};
    if(url.indexOf('?')!=-1){
        let arr=url.split('?')[1].split('&');
        arr.forEach(item=>{
            let a=item.split('=');
            obj[a[0]]=a[1];
        });
    }
    return obj[name];
}