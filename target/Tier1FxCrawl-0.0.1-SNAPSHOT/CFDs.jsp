<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="com.newtraderlab.services.Tier1FxCrawl.Crawler" %>
    <%@page import="com.newtraderlab.services.Tier1FxCrawl.CrawlerVersion" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>CFDs from Tier1Fx - NewTraderLab</title>
</head>
<body>

<% 
Crawler crawler = new Crawler(CrawlerVersion.CFDS);
String html = crawler.getCrawling();
%>
<%=html %>
</body>
</html>