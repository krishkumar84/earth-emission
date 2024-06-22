"use client"
import Link from 'next/link'
import OnboardingHeader from '../onboarding-header'
import OnboardingImage from '../onboarding-image'
import OnboardingProgress from '../onboarding-progress'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Onboarding03() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('USA');
  const [companyEmail, setCompanyEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email:string) => {
    const commonDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
    const emailDomain = email.split('@')[1];
    if (emailDomain) {
      return !commonDomains.includes(emailDomain);
    }
    return true;
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const email = (e.target as HTMLInputElement).value;
    setCompanyEmail(email);
    setIsValidEmail(validateEmail(email));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('city', city);
    localStorage.setItem('postalCode', postalCode);
    localStorage.setItem('street', street);
    localStorage.setItem('country', country);
    router.push('/onboarding-04');
    console.log(companyName, city, postalCode, street, country);
  };
  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative flex">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <div className="flex-1">

              <OnboardingHeader />
              <OnboardingProgress step={3} />

            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">

                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Company information ✨</h1>
                {/* htmlForm */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-8">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="company-name">Company Name <span className="text-rose-500">*</span></label>
                      <input required id="company-name" onChange={(e)=>setCompanyName(e.target.value)}  className="form-input w-full" type="text" />
                    </div>
                    {/* Company Mail Address */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="company-name">Company Email <span className="text-rose-500">*</span></label>
                      <input required id="company-email" value={companyEmail} onChange={handleChange} className={`form-input w-full ${isValidEmail ? '' : 'border-red-500'}`} type="email"/>
                    {!isValidEmail && (
                       <p className="text-red-500 text-sm mt-1">Please enter a valid company email address.</p>
                     )} </div>
                    {/* City and Postal Code */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1" htmlFor="city">City <span className="text-rose-500">*</span></label>
                        <input required id="city" onChange={(e)=>setCity(e.target.value)} className="form-input w-full" type="text" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1" htmlFor="postal-code">Postal Code <span className="text-rose-500">*</span></label>
                        <input required id="postal-code" onChange={(e)=>setPostalCode(e.target.value)} className="form-input w-full" type="text" />
                      </div>
                    </div>
                    {/* Street Address */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="street">Street Address <span className="text-rose-500">*</span></label>
                      <input required id="street" onChange={(e)=>setStreet(e.target.value)} className="form-input w-full" type="text" />
                    </div>
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="country">Country <span className="text-rose-500">*</span></label>
                      <select id="country" onChange={(e)=>setCountry(e.target.value)} className="form-select w-full">
                        <option>USA</option>
                        <option>Italy</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link className="text-sm underline hover:no-underline" href="/onboarding-02">&lt;- Back</Link>
                    <button type='submit' className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" >Next Step -&gt;</button>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>

        <OnboardingImage />

      </div>

    </main>
  )
}
