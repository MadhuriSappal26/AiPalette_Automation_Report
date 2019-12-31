Cypress.Commands.add("consumer_quote",() => {


    cy.request({
        method: 'GET',
        url: 'https://prod-api.aipalette.com/api/project/4', // baseUrl is prepended to url
       headers:
        { 
        'Content-Type':'application/json',
        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3ODExOTM5LCJqdGkiOiJkZTkyODk5YzRiNDk0YTIyOWE1OGM1YzQ5MmYzMThhZiIsInVzZXJfaWQiOjIyOX0.EQRi1a4KkPNYs1aDhcQeNCTZTeO4cxKD2HyM7MWmllk'
        },
        'failOnStatusCode': 'false'
        
    
    })
    .then((response)=>
    {
        expect(response.body.sub_categories).to.not.have.length(0)
        //console.log(response.body)
        var sub_categories_array=response.body.sub_categories
        var trends_array=response.body.trends
        var final_ing_list=[]
        //console.log(sub_categories_array)
       //console.log(trends_array)
       sub_categories_array.forEach(($obj)=>
       {
        console.log($obj[0].ingredient,$obj[0].name)
       var ingList=$obj[0].ingredient
       final_ing_list.push(ingList)
      })
     

    final_ing_list.forEach((ids)=>
    {
        cy.request({
            method: 'GET',
            url: 'https://prod-api.aipalette.com/api/ingredients/ingredient/'+ids+'/quotes/', // baseUrl is prepended to url
           headers:
            { 
            'Content-Type':'application/json',
            'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3ODExOTUzLCJqdGkiOiI3OGZjODNkNWQ4ZDI0Y2EwOGQzZmY4ZTAzY2RhODczMCIsInVzZXJfaWQiOjIyOX0.Js-L4TaIopIPoxD1SKncML7t3HK2tqMvatS361Tq9eg'
            },
        
        }).then((response)=>{
           //expect(response.body.weibo_quotes).to.not.have.length(0)
            var weibo_quotes_array=response.body.weibo_quotes
            if(weibo_quotes_array.length==0)
            {
                console.log("missing customer quote.....", ids)
                console.log(response.body)
                expect(response.body.weibo_quotes).to.have.length(0)
            }
           
           })
        
    })
})
    
  /*  cy.request({
    method: 'GET',
    url: 'https://prod-api.aipalette.com/api/ingredients/ingredient/7327/quotes/', // baseUrl is prepended to url
   headers:
    { 
    'Content-Type':'application/json',
    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3NzY4NTQ5LCJqdGkiOiJkODkyYTFiOTIwYTc0Yjg5OTJhMDcxOWFhZTQwOTExMSIsInVzZXJfaWQiOjIyOX0.0DiQmAvQaJ1dlNHYqUh3gErZ2vQK4uNJVrqYOzZWwkg'
    },

    

})
.then((response)=>{
console.log(response.body)
expect(response.body.weibo_quotes).to.not.have.length(0)
var weibo_quotes_array=response.body.weibo_quotes
console.log(weibo_quotes_array)
var text_array=weibo_quotes_array.filter((x)=>x.text)
console.log(text_array)
expect(text_array).to.not.to.be.null
var quoteList=[]
weibo_quotes_array.forEach(($obj,i)=>
{
var textList=$obj.text
var usernameList=$obj.username
console.log(usernameList, textList)
quoteList.push(textList,usernameList)
})
//var filtered_array=resp_array.filter((x)=> x.subcategories)
//console.log(filtered_array)

})*/
})