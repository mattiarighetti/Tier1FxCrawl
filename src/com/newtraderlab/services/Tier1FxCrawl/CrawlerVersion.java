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

import java.io.Serializable;

/**
* Different crawler versions for Tier1Fx.
* Every crawler crawls a different section of the website,
* ready to be embedded through a JSP page.
*
* @version 1.0 23 Dec 2019
* @author Mattia Righetti (mattiarighe@me.com)
*/
public final class CrawlerVersion implements Serializable {

	private static final long serialVersionUID = -328732255371115783L;
	
	public static final CrawlerVersion FOREX;
	public static final CrawlerVersion CFDS;
	public static final CrawlerVersion LIVESPREADS;
	public static final CrawlerVersion WEEKLYSWAPS;
	
	private int crawlerNumber_;
	private String crawlerNickname_;
	
	private CrawlerVersion(final int crawlerNumber, final String crawlerNickname) {
		this.crawlerNumber_ = crawlerNumber;
		this.crawlerNickname_ = crawlerNickname;
	}
	
	public int getCrawlerNumber() {
		return crawlerNumber_;
	}
	@Override
    public String toString() {
        return this.crawlerNickname_;
    }
	
	static {
		CFDS = new CrawlerVersion(1, "CFDs");
		FOREX = new CrawlerVersion(2, "Forex");
		LIVESPREADS = new CrawlerVersion(3, "LiveSpreads");
		WEEKLYSWAPS = new CrawlerVersion(4, "WeeklySwaps");
	}
	
}
