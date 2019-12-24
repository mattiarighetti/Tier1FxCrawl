/*
* %W% %E% Mattia Righetti
*
* Copyright (c) 2019 New Trader Lab Ltd. All Rights Reserved.
*
* This software is the confidential and proprietary information of New
* Trader Lab Ltd. ("Confidential Information"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Sun.
*
* NTL MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
* THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
* TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
* PARTICULAR PURPOSE, OR NON-INFRINGEMENT. NTL SHALL NOT BE LIABLE FOR
* ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
* DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*/
package com.newtraderlab.services.Tier1FxCrawl;

import java.io.IOException;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.html.HtmlDivision;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.newtraderlab.services.Tier1FxCrawl.CrawlerVersion;

/**
* Class for different Tier1Fx website section crawling.
*
* @version 1.0 23 Dec 2019
* @author Mattia Righetti (mattiarighe@me.com)
*/
public class Crawler {
	
	private CrawlerVersion crawlerVersion_;
	private WebClient webClient = new WebClient(BrowserVersion.BEST_SUPPORTED);
	
	public Crawler(CrawlerVersion crawlerVersion) {
		this.crawlerVersion_ = crawlerVersion;
	}
	
	public String getCrawling() {
		switch (crawlerVersion_.getCrawlerNumber()) {
		case 1:
			return CfdsCryptosCrawler();
		case 2:
			return CfdsIndicesCrawler();
		case 3:
			return ForexCrawler();
		case 4:
			return LiveSpreadsCrawler();
		case 5:
			return WeeklySwapsCrawler();
		}
		return null;
	}
	
	private String CfdsCryptosCrawler() {
		HtmlPage htmlPage = null;
		try {
			htmlPage = webClient.getPage("https://www.tier1fx.com/t1-brokerage/trading/contracts-specifications/");
		} catch (FailingHttpStatusCodeException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlDivision htmlDivision = htmlPage.getFirstByXPath("/html/body/div[1]/div/main/section[6]/div/div/div/div[2]");
		return htmlDivision.asXml().toString();
	}
	
	private String CfdsIndicesCrawler() {
		HtmlPage htmlPage = null;
		try {
			htmlPage = webClient.getPage("https://www.tier1fx.com/t1-brokerage/trading/contracts-specifications/");
		} catch (FailingHttpStatusCodeException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlDivision htmlDivision = htmlPage.getFirstByXPath("/html/body/div[1]/div/main/section[4]/div/div/div/div[2]");
		return htmlDivision.asXml().toString();
	}
	
	private String ForexCrawler() {
		HtmlPage htmlPage = null;
		try {
			htmlPage = webClient.getPage("https://www.tier1fx.com/t1-brokerage/trading/contracts-specifications/");
		} catch (FailingHttpStatusCodeException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlDivision htmlDivision = htmlPage.getFirstByXPath("/html/body/div[1]/div/main/section[2]/div/div/div/div[2]");
		return htmlDivision.asXml().toString();
	}
	
	private String LiveSpreadsCrawler() {
		HtmlPage htmlPage = null;
		try {
			htmlPage = webClient.getPage("https://www.tier1fx.com/t1-brokerage/");
		} catch (FailingHttpStatusCodeException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlDivision htmlDivision = htmlPage.getFirstByXPath("/html/body/div[1]/div/main/section[5]/div/div/div/div[2]");
		return htmlDivision.asXml().toString();
	}
	
	private String WeeklySwapsCrawler() {
		HtmlPage htmlPage = null;
		try {
			htmlPage = webClient.getPage("https://www.tier1fx.com/t1-brokerage/trading/contracts-specifications/");
		} catch (FailingHttpStatusCodeException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			webClient.close();
		}
		HtmlDivision htmlDivision = htmlPage.getFirstByXPath("//*[@id=\"swapscalendar-anchor\"]/div/div/div/div[2]");
		return htmlDivision.asXml().toString();
	}
	
}
