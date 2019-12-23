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
package com.newtraderlab.services.Tier1FxCrawl.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
* Servlet for Tier1Fx ajax requests mirroring.
* It's needed to update and upload the tables in the embeddable JSPs.
*
* @version 1.0 23 Dec 2019
* @author Mattia Righetti (mattiarighe@me.com)
*/
public class AjaxMirror extends HttpServlet {
	
	private static final long serialVersionUID = -6318667211554201316L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("action");
		String tableType = request.getParameter("tableType");
		String selectedSymbols = request.getParameter("selectedSymbols");
		
		CloseableHttpClient closeableHttpClient = HttpClients.createDefault();
		HttpGet httpGet = new HttpGet("https://www.tier1fx.com/wp-admin/admin-ajax.php?action=" + URLEncoder.encode(action, "UTF-8") + "&tableType=" + URLEncoder.encode(tableType, "UTF-8") + "&selectedSymbols=" + URLEncoder.encode(selectedSymbols, "UTF-8"));

		response.setContentType("text/html;charset=UTF-8");
		PrintWriter printWriter = response.getWriter();
        try (CloseableHttpResponse closeableHttpResponse = closeableHttpClient.execute(httpGet)) {
            HttpEntity httpEntity = closeableHttpResponse.getEntity();
            if (httpEntity != null) {
                printWriter.println(EntityUtils.toString(httpEntity));
            }
        } catch (Exception e) {
        	e.printStackTrace();
        } finally {
        	closeableHttpClient.close();
        	printWriter.close();
        }
	}

}
