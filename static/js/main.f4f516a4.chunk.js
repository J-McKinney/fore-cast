(this["webpackJsonpfore-cast"]=this["webpackJsonpfore-cast"]||[]).push([[0],{25:function(e,t,s){},43:function(e,t,s){},48:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),c=s(15),o=s.n(c),i=(s(25),s(16)),r=s(17),l=s(20),h=s(18),d=s(19),m=s(3),u=s.n(m),p=s.p+"static/media/golfBall.4daa5f5c.svg",g=(s(43),s(0));s(45).config();var j=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(i.a)(this,s);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={temp:"",humidity:"",windSpeed:"",weatherDescription:"",city:"",state:"",zip:"",myLat:"",myLon:"",placesToGolf:[],pickedGolfLat:"",pickedGolfLon:""},e.getForecast=function(t){if(t.preventDefault(),"undefined"!==e.state.myLat){var s="https://api.openweathermap.org/data/2.5/onecall?lat="+e.state.myLat+"&lon="+e.state.myLon+"&units=imperial&exclude=minutely,alerts&appid=7c9fcccfb24695a473809f8f4e32421c";u.a.get(s).then((function(t){return e.setState({temp:t.data.current.temp,humidity:t.data.current.humidity,weatherDescription:t.data.current.weather[0].description,windSpeed:t.data.current.wind_speed}),u.a.get(s)})).catch((function(e){console.log(e),alert("Something Went Wrong4 "+e)}));var a="https://maps.googleapis.com/maps/api/geocode/json?latlng="+e.state.myLat+","+e.state.myLon+"&key=AIzaSyA9C-teXa31caCvWVDudnqUX0Edr5otzzg";u.a.get(a).then((function(t){return e.setState({city:t.data.results[0].address_components[2].long_name,state:t.data.results[0].address_components[4].short_name,zip:t.data.results[0].address_components[6].long_name}),u.a.get(a)})).catch((function(e){console.log(e),alert("Something Went Wrong5 "+e)}))}else console.log("Something Went Wrong!!!"),alert("Something Went Wrong6");return u.a.get("https://corsanywhere.herokuapp.com/".concat("https://api.yelp.com/v3/businesses/search"),{headers:{Authorization:"Bearer ".concat("egn8TUBL3YWjTQRRR-_SpODJ1d1SW7JKggGx49iBT3sX7lAFxEMxJXpcUnTDnvoxL7M481VWXsvbSW1yAe6yZcBYwadHem2Uu-kGOZsfAC71fy3PkgTSlAc3RT9MYHYx")},params:{term:"golf",categories:"golf",limit:50,radius:4e4,sort_by:"distance",open_now:!0,latitude:e.state.myLat,longitude:e.state.myLon}}).then((function(t){e.setState({placesToGolf:t.data.businesses})})).catch((function(e){console.log(e),alert("Something Went Wrong7 "+e)}))},e}return Object(r.a)(s,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){var s=t.coords;e.setState({myLat:s.latitude}),e.setState({myLon:s.longitude})}),(function(e){console.warn("Error(".concat(e.code,"): ").concat(e.message)),alert("Something Went Wrong 1 "+e),alert("Something Went Wrong 2 "+e.code),alert("Something Went Wrong 3 "+e.message)}),{enableHighAccuracy:!0,timeout:61e3,maximumAge:0})}},{key:"render",value:function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)("br",{}),Object(g.jsx)("img",{src:p,className:"App-logo",alt:"logo"}),Object(g.jsx)("br",{}),Object(g.jsx)(d.a,{className:"golfButton",variant:"success",onClick:this.getForecast,children:Object(g.jsx)("h2",{className:"foreButton",children:"FORE-CAST"})}),Object(g.jsx)("br",{}),Object(g.jsxs)("section",{className:"section",children:[Object(g.jsxs)("h3",{className:"section",children:["Temp: ",this.state.temp," Fehrenheit"]}),Object(g.jsxs)("h5",{className:"section",children:["Humidity: ",this.state.humidity,"%"]}),Object(g.jsxs)("h5",{className:"section",children:["Wind Speed: ",this.state.windSpeed," mph"]}),Object(g.jsxs)("h5",{className:"section",children:["Forecast: ",this.state.weatherDescription]}),Object(g.jsxs)("h3",{className:"section",children:["Your Location:"," "+this.state.city+" "+this.state.state+" "+this.state.zip]}),Object(g.jsx)("hr",{className:"hr"}),Object(g.jsx)("h3",{children:"Golf Results Closest To Furthest From You:"}),Object(g.jsx)("hr",{className:"hr"}),Object(g.jsx)("div",{children:this.state.placesToGolf.filter((function(e){return e})).map((function(e){return Object(g.jsxs)("header",{children:[Object(g.jsx)("h2",{className:"section",children:e.name}),Object(g.jsx)("h4",{className:"section",children:e.display_phone}),Object(g.jsx)("h4",{className:"section",children:e.location.display_address[0]}),Object(g.jsx)("h4",{className:"section",children:e.location.display_address[1]}),Object(g.jsx)("h4",{className:"section",children:e.location.display_address[2]}),Object(g.jsxs)("h4",{className:"section",children:["Rating: ",e.rating,"/5"]}),Object(g.jsx)("hr",{className:"hr"})]},e.id)}))})]})]})})})}}]),s}(a.Component),f=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,49)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,o=t.getTTFB;s(e),a(e),n(e),c(e),o(e)}))};o.a.render(Object(g.jsx)(n.a.StrictMode,{children:Object(g.jsx)(j,{})}),document.getElementById("root")),f()}},[[48,1,2]]]);
//# sourceMappingURL=main.f4f516a4.chunk.js.map