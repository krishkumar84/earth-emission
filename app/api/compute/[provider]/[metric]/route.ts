// import { NextRequest, NextResponse } from "next/server"
// export async function POST(request:NextRequest, {params}:any) {
//   try {
//     const metric = params.metric
//     const provider = params.provider
//     const body = await request.json()
//     const jsonString = JSON.stringify(body);
//     console.log("body")
//     console.log(body)
//     console.log("jsonString")
//     console.log(jsonString)
//     const apiKey = 'Bearer EE.O45AYXQ-AJFENCA-WS4CRSY-GZRRZRA'; // Your API key
//     const headers = {
//       'Authorization': apiKey,
//       'Content-Type': 'application/json'
//     };
//     const res = await fetch(`http://beta.api.earthemission.com/compute/${provider}/${metric}`, {
//       method: 'POST',
//       body: body,
//       headers: headers
//     });
//     console.log(res)
//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const responsedata = await res.json();
//     console.log(responsedata)
//     return NextResponse.json({ responsedata });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  try {
    const metric = params.metric;
    const provider = params.provider;
    const body = await request.json();

    // Log the entire body for debugging
    console.log("body:", body);

    const apiKey = 'Bearer EE.O45AYXQ-AJFENCA-WS4CRSY-GZRRZRA'; 
    const headers = {
      'Authorization': apiKey,
      'Content-Type': 'application/json'
    };

    // Collect responses
    const results = [];

    for (const item of body) {
      const jsonString = JSON.stringify(item);

      // Log the specific data being sent
      console.log("Sending data:", jsonString);

      const res = await fetch(`http://beta.api.earthemission.com/compute/${provider}/${metric}`, {
        method: 'POST',
        body: jsonString,
        headers: headers
      });

      if (!res.ok) {
        const errorText = await res.text(); // Capture error message
        throw new Error(`Failed to fetch data: ${res.status} ${errorText}`);
      }

      const responseData = await res.json();
      console.log("Response data:", responseData);

      // Merge the response data with the original item data
      const result = {
        ...item,
        co2e: responseData.co2e,
        co2e_unit: responseData.co2e_unit,
        co2e_calculation_method: responseData.co2e_calculation_method,
        co2e_calculation_origin: responseData.co2e_calculation_origin,
        activity_data: responseData.activity_data,
        audit_trail: responseData.audit_trail
      };

      results.push(result);
    }

    // Return all collected results
    // console.log("Results:", results);
    return NextResponse.json({ results });

  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

