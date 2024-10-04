public with sharing class weatherReportController {
    @AuraEnabled(cacheable=true)
    public static String getWeather(String location) {
        String apiKey = '888b1207c9f0daa1c1615b067d8355c0';
        String apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;

      
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            system.debug(response.getBody());
            return response.getBody();
        } else {
            throw new AuraHandledException('Error retrieving weather information: ' + response.getBody());
        }
    }
}