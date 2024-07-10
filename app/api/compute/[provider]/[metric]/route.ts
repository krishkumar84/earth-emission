import { NextRequest, NextResponse } from "next/server"
export async function POST(request:NextRequest, {params}:any) {
  try {
    const metric = params.metric
    const provider = params.provider
    const body = await request.json()
    const jsonString = JSON.stringify(body);
    console.log(body)
    console.log(jsonString)
    const apiKey = 'Bearer EE.O45AYXQ-AJFENCA-WS4CRSY-GZRRZRA'; // Your API key
    const headers = {
      'Authorization': apiKey,
      'Content-Type': 'application/json'
    };
    const res = await fetch(`http://beta.api.earthemission.com/compute/${provider}/${metric}`, {
      method: 'POST',
      body: jsonString,
      headers: headers
    });
    console.log(res)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const responsedata = await res.json();
    console.log(responsedata)
    return NextResponse.json({ responsedata });
  } catch (error) {
    console.error('Error:', error);
  }
}