<%-- 
  - Author: Mattia Righetti (mattiarighe@me.com)
  - Date: 23 Dec 2019
  - @(1.0)
  - Description: JSP for LiveSpreads section, ready to be embedded. 
  --%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%@ page import="com.newtraderlab.services.Tier1FxCrawl.Crawler"%>
<%@ page import="com.newtraderlab.services.Tier1FxCrawl.CrawlerVersion"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>LiveSpreads from Tier1Fx - NewTraderLab</title>
<link rel="stylesheet" id="wp-block-library-css"
	href="static/style.min.css?ver=5.3.2" type="text/css" media="all">
<link rel="stylesheet" type="text/css" href="static/tier1fx-main.css">
<link rel="stylesheet" id="jquery-ui-css-css"
	href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.min.css?ver=1.11.4"
	type="text/css" media="">
<script type="text/javascript" src="static/jquery.js?ver=1.12.4-wp"></script>
<script type="text/javascript"
	src="static/jquery-migrate.min.js?ver=1.4.1"></script>
<style>
.mod-common-container {
	padding-bottom: 0px !important;
	padding-top: 0px !important;
}
</style>
</head>
<body
	class="page-template page-template-template-brokerage page-template-template-brokerage-php page page-id-47 page-parent t1-brokerage">
	<div class="wrap container-fluid" role="document">
		<div class="content row">
			<main class="main">
				<section class="mod-third-party-table mod-common-container">
					<div class="container">
						<div class="row">
							<div class="col-12">
								<%
									Crawler crawler = new Crawler(CrawlerVersion.LIVESPREADS);
									String html = crawler.getCrawling();
								%>
								<%=html%>
								<!-- Adding buttons statically -->
								<div class="buttons-container">
									<div class="button-item button-normal-with-plus-icon">
										<a class="medium showfulllist-action"
											data-more="Show full list" data-less="Hide full list"
											data-expanded="false">Show full list</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	</div>
	<script type="text/javascript" src="static/tier1fx-main.js"></script>
	<script type="text/javascript" src="static/core.min.js?ver=1.11.4"></script>
	<script type="text/javascript" src="static/widget.min.js?ver=1.11.4"></script>
	<script type="text/javascript" src="static/position.min.js?ver=1.11.4"></script>
	<script type="text/javascript" src="static/menu.min.js?ver=1.11.4"></script>
	<script type="text/javascript"
		src="static/selectmenu.min.js?ver=1.11.4"></script>
</body>
</html>