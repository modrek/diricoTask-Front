import React from 'react';
export function parsImageMetadata(txt: string) {
    var mydata = {} as any;

    var obj = JSON.parse(txt);
    var obj1 = JSON.stringify(obj.categories);
    mydata["categories"] = obj1;

    obj1 = JSON.stringify(obj.tags);
    mydata["tags"] = (obj1);

    obj1 = JSON.stringify(obj.adult);
    mydata["adult"] = (obj1);

    obj1 = JSON.stringify(obj.color);
    mydata["color"] = (obj1);

    obj1 = JSON.stringify(obj.imageType);
    mydata["imageType"] = (obj1);

    obj1 = JSON.stringify(obj.description);
    mydata["description"] = (obj1);

    obj1 = JSON.stringify(obj.faces);
    mydata["faces"] = (obj1);

    obj1 = JSON.stringify(obj.objects);
    mydata["objects"] = (obj1);

    obj1 = JSON.stringify(obj.brands);
    mydata["brands"] = (obj1);

    obj1 = JSON.stringify(obj.requestId);
    mydata["requestId"] = (obj1);

    obj1 = JSON.stringify(obj.metadata);
    mydata["metadata"] = (obj1);

    // let htmlobject=<>
    // {mydata["tags"].map((x : any) => (
    //           <p>{x.name}</p>


    //         ))}

    // <div></div>
    // </>

    return mydata["tags"];
}