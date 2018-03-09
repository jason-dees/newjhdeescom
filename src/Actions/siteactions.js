export const GO_TO_INDEX = "GO_TO_INDEX";

export const goToIndex = (page) => ({
    type: GO_TO_INDEX,
    page 
});

export const Pages = [
    {'route': '/', 'title':"My Card"}, 
    //{'route': '/doc', 'title': "Doc"}, 
    //{'route': '/coeditor', 'title': "CoEditor"}, 
    {'route': '/image', 'title': "Scribblin"}
];

export const  tabLocationCheck = function(location, route){
    var currentLocation = location.hash.replace("#", '');

    if(currentLocation === Pages[0].route && route === Pages[0].route){
        return true;
    }

    return currentLocation.indexOf(route) > -1 && route !== Pages[0].route;
}