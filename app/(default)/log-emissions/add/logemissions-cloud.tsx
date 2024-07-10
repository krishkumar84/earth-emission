// This below check is added to avoid type script warnings and errors, remove this in future and fix all the type erros
// @ts-nocheck

"use client"


// server action to calculate and add co2 emissions to the table
import { addCo2eEmissions } from "../../../lib/actions";
import {cloud_duration_unit} from "../../../utils/constants";
import {cloud_providers} from "../../../utils/constants";


import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import React from "react";

import Addemissions from "./logemissions-root"


const AddemissionsCloud =  forwardRef(({nameProp, sectorProp, categoryProp }, ref) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [Name, setName] = useState('');
  const [sector, setSector] = useState([]);
  const [category, setCategory] = useState([]);
  const [year, setYear] = React.useState<React.Key>("");
  const [region, setRegion] = React.useState<React.Key>("");
  const [cpu_count, setCpu_count] = React.useState<React.Key>("");
  const [cpu_load, setCpu_load] = React.useState<React.Key>("");
  const [data, setData] = React.useState<React.Key>("");
  const [data_unit, setData_unit] = React.useState<React.Key>("");
  const [storage_type, setStorage_type] = React.useState<React.Key>("");
  const [duration_unit, setDuration_unit] = React.useState<React.Key>("");
  const [duration, setDuration] = React.useState<React.Key>("");
  const [co2e_unit, setCo2eUnit] = React.useState<React.Key>("");
  const [metric, setMetric] = useState("");
  const [provider, setProvider] = React.useState<React.Key>("");
  const [methodology, setMethodology] = React.useState<React.Key>("");

  console.log(sectorProp)


  console.log(categoryProp)

  console.log(nameProp)

        

         const formSubmitHandler = async (event) => {
          // event.preventDefault();
          try {

            let postData = null;

            if (sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - CPU'){

                // adding body params to send to the compute end point
                postData = JSON.stringify({
                  "cpu_count": cpu_count,
                  "region": region,
                  "cpu_load": cpu_load,
                  "duration": duration,
                  "duration_unit": duration_unit,
                  "year": year,
                });
              }

            else if (sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Memory'){

                // adding body params to send to the compute end point
                postData = JSON.stringify({
                  "data": data,
                  "region": region,
                  "data_unit": data_unit,
                  "duration": duration,
                  "duration_unit": duration_unit,
                  "year": year,
              });
            }

            else if (sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Storage'){

              // adding body params to send to the compute end point
              postData = JSON.stringify({
                "data": data,
                "region": region,
                "storage_type": storage_type,
                "data_unit": data_unit,
                "duration": duration,
                "duration_unit": duration_unit,
                "year": year,
            });
            }

            else if (sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Networking'){

              // adding body params to send to the compute end point
              postData = JSON.stringify({
                "data": data,
                "region": region,
                "data_unit": data_unit,
                "year": year,
            });
            }

            console.log(cpu_count)
            console.log(region)
            console.log(cpu_load)
            console.log(duration)
            console.log(duration_unit)
            console.log(year)


            // Assuming category_set is a string like 'Cloud Computing - CPU'

            const categorySet_split = categoryProp.split(' - ');
            // Make sure category_set has at least two parts after splitting
            
              console.log(categorySet_split.length >= 2)
              // Extract the second part and convert it to lowercase
              const metricValue = categorySet_split[1].toLowerCase();
              console.log(metricValue)

              // Update the metric state
              setMetric(metricValue);
              console.log(metric)
            
            // compute api is called here
            const response = await fetch(`/api/compute/${provider}/${metricValue}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: postData
            })
            const responsedata = await response.json(); // Parse JSON response

            console.log(responsedata); // Log the fetched data
            const co2e = responsedata.responsedata.co2e
            const co2e_unit = responsedata.responsedata.co2e_unit
            console.log(co2e)
              // Assuming responseData.co2e holds the CO2e value
              const co2eEmission = await addCo2eEmissions({
                Name:nameProp,
                sector:sectorProp,
                category:categoryProp,
                methodology,
                year,
                region,
                co2e_unit: co2e_unit,
                co2e: co2e // Pass CO2e value to addCo2eEmissions
              });

              console.log(co2e)

              // resetting all the values to empty
              setName('');
              // setSector_set('');
              // setCategory_set('');
              setProvider('');
              setMethodology('');
              setYear('');
              setRegion('');
              setDuration_unit('');
              setMetric('')

              return co2eEmission; 

          }
            catch (error) {
              console.error('Error creating Emission:', error);
            }
        };

        useImperativeHandle(ref, () => ({
          formSubmitHandler,
        }));


  return (
    <div>
    
            <>
              <form onSubmit={formSubmitHandler} className='flex flex-col gap-6'>
                    
                    {sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - CPU' && (
                      <>
                     
                      <div className="flex flex-row gap-20">
                        <div>
                          <Autocomplete 
                              placeholder="Select a cloud provider" 
                              size="lg"
                              className="w-96" 
                              selectedKey={provider}
                              name = 'cloud provider'
                              value={provider}
                              onSelectionChange={setProvider}
                              isRequired
                              variant="bordered"
                              allowsCustomValue={true}
                              isDisabled={!sectorProp?.length}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                            >
                              {cloud_providers.map((provider) => (
                                <AutocompleteItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>
                        
                          </div>
                          <div>
                            <Input
                              placeholder="Year"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'year'
                              value={year}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setYear(event.target.value)}
                            />
                          </div>
                        </div>
                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="CPU Load"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'cpu_load'
                              value={cpu_load}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setCpu_load(event.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                              size="lg"
                              isRequired
                              placeholder="Region"
                              className="w-96"
                              variant="bordered"
                              name = 'region'
                              value={region}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setRegion(event.target.value)}
                            />
                          </div>
                      </div>

                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="Duration"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'duration'
                              value={duration}
                              allowsCustomValue={true}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setDuration(event.target.value)}
                            />
                        </div>
                        <div>
                        <Autocomplete 
                                placeholder="Duration unit" 
                                size="lg"
                                className="w-96" 
                                selectedKey={duration_unit}
                                name = 'cloud provider'
                                value={duration_unit}
                                onSelectionChange={setDuration_unit}
                                isRequired
                                variant="bordered"
                                allowsCustomValue={true}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              >
                                {cloud_duration_unit.map((duration_unit) => (
                                  <AutocompleteItem key={duration_unit.value} value={duration_unit.value}>
                                    {duration_unit.label}
                                  </AutocompleteItem>
                                ))}
                            </Autocomplete>
                          </div>
                          </div>
                          <div className="flex flex-row gap-20">
                            
                            <div>
                              <Input
                                placeholder="CPU Count"
                                size="lg"
                                className="w-96" 
                                variant="bordered"
                                isRequired
                                name = 'cpu_count'
                                value={cpu_count}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                onChange={(event) => setCpu_count(event.target.value)}
                              />
                            </div>
                          </div>
                        </>)}


                    {sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Memory' && (
                      <>
                     
                      <div className="flex flex-row gap-20">
                        <div>
                          <Autocomplete 
                              placeholder="Select a cloud provider" 
                              size="lg"
                              className="w-96" 
                              selectedKey={provider}
                              name = 'cloud provider'
                              value={provider}
                              onSelectionChange={setProvider}
                              isRequired
                              variant="bordered"
                              allowsCustomValue={true}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              isDisabled={!sectorProp?.length}
                            >
                              {cloud_providers.map((provider) => (
                                <AutocompleteItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>
                        
                          </div>
                          <div>
                            <Input
                              placeholder="Year"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'year'
                              value={year}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setYear(event.target.value)}
                            />
                          </div>
                        </div>
                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="data"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'data'
                              value={data}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setData(event.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                              size="lg"
                              isRequired
                              placeholder="Region"
                              className="w-96"
                              variant="bordered"
                              name = 'region'
                              value={region}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setRegion(event.target.value)}
                            />
                          </div>
                      </div>

                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="Duration"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'duration'
                              value={duration}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setDuration(event.target.value)}
                            />
                        </div>
                        <div>
                        <Autocomplete 
                                placeholder="Duration unit" 
                                size="lg"
                                className="w-96" 
                                selectedKey={duration_unit}
                                name = 'cloud provider'
                                value={duration_unit}
                                onSelectionChange={setDuration_unit}
                                isRequired
                                variant="bordered"
                                allowsCustomValue={true}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              >
                                {cloud_duration_unit.map((duration_unit) => (
                                  <AutocompleteItem key={duration_unit.value} value={duration_unit.value}>
                                    {duration_unit.label}
                                  </AutocompleteItem>
                                ))}
                            </Autocomplete>
                          </div>
                          </div>
                          <div className="flex flex-row gap-20">
                            
                            <div>
                              <Input
                                placeholder="data_unit"
                                size="lg"
                                className="w-96" 
                                variant="bordered"
                                isRequired
                                name = 'data_unit'
                                value={data_unit}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                onChange={(event) => setData_unit(event.target.value)}
                              />
                            </div>
                          </div>
                        </>)}

                    {sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Storage' && (
                      <>
                     
                      <div className="flex flex-row gap-20">
                        <div>
                          <Autocomplete 
                              placeholder="Select a cloud provider" 
                              size="lg"
                              className="w-96" 
                              selectedKey={provider}
                              name = 'cloud provider'
                              value={provider}
                              onSelectionChange={setProvider}
                              isRequired
                              variant="bordered"
                              allowsCustomValue={true}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              isDisabled={!sectorProp?.length}
                            >
                              {cloud_providers.map((provider) => (
                                <AutocompleteItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>
                        
                          </div>
                          <div>
                            <Input
                              placeholder="Year"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'year'
                              value={year}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setYear(event.target.value)}
                            />
                          </div>
                        </div>
                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="data"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'data'
                              value={data}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setData(event.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                              size="lg"
                              isRequired
                              placeholder="Region"
                              className="w-96"
                              variant="bordered"
                              name = 'region'
                              value={region}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setRegion(event.target.value)}
                            />
                          </div>
                      </div>

                      <div className="flex flex-row gap-20">
                        <div>
                          <Input
                              placeholder="Duration"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'duration'
                              value={duration}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setDuration(event.target.value)}
                            />
                        </div>
                        <div>
                        <Autocomplete 
                                placeholder="Duration unit" 
                                size="lg"
                                className="w-96" 
                                selectedKey={duration_unit}
                                name = 'cloud provider'
                                value={duration_unit}
                                onSelectionChange={setDuration_unit}
                                isRequired
                                variant="bordered"
                                allowsCustomValue={true}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              >
                                {cloud_duration_unit.map((duration_unit) => (
                                  <AutocompleteItem key={duration_unit.value} value={duration_unit.value}>
                                    {duration_unit.label}
                                  </AutocompleteItem>
                                ))}
                            </Autocomplete>
                          </div>
                          </div>
                          <div className="flex flex-row gap-20">
                            
                            <div>
                              <Input
                                placeholder="data_unit"
                                size="lg"
                                className="w-96" 
                                variant="bordered"
                                isRequired
                                name = 'data_unit'
                                value={data_unit}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                onChange={(event) => setData_unit(event.target.value)}
                              />
                            </div>
                            <div>
                              <Input
                                placeholder="storage_type"
                                size="lg"
                                className="w-96" 
                                variant="bordered"
                                isRequired
                                name = 'storage_type'
                                value={storage_type}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                onChange={(event) => setStorage_type(event.target.value)}
                              />
                            </div>
                          </div>
                        </>)}

                    {sectorProp === 'Information and Communication' && categoryProp === 'Cloud Computing - Networking' && (
                      <>
                     
                      <div className="flex flex-row gap-20">
                        <div>
                          <Autocomplete 
                              placeholder="Select a cloud provider" 
                              size="lg"
                              className="w-96" 
                              selectedKey={provider}
                              name = 'cloud provider'
                              value={provider}
                              onSelectionChange={setProvider}
                              isRequired
                              variant="bordered"
                              allowsCustomValue={true}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              isDisabled={!sectorProp?.length}
                            >
                              {cloud_providers.map((provider) => (
                                <AutocompleteItem key={provider.value} value={provider.value}>
                                  {provider.label}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>
                        
                          </div>
                          <div>
                            <Input
                              placeholder="Year"
                              size="lg"
                              className="w-96" 
                              variant="bordered"
                              isRequired
                              name = 'year'
                              value={year}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setYear(event.target.value)}
                            />
                          </div>
                        </div>
                      <div className="flex flex-row gap-20">
                        <div>
                            <Input
                              size="lg"
                              isRequired
                              placeholder="Region"
                              className="w-96"
                              variant="bordered"
                              name = 'region'
                              value={region}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setRegion(event.target.value)}
                            />
                          </div>
                          <div>
                              <Input
                                placeholder="data_unit"
                                size="lg"
                                className="w-96" 
                                variant="bordered"
                                isRequired
                                name = 'data_unit'
                                value={data_unit}
                                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                onChange={(event) => setData_unit(event.target.value)}
                              />
                            </div>
                      </div>

                      <div className="flex flex-row gap-20">
                        <div>
                            <Input
                              size="lg"
                              isRequired
                              placeholder="data"
                              className="w-96"
                              variant="bordered"
                              name = 'data'
                              value={data}
                              style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                              onChange={(event) => setData(event.target.value)}
                            />
                          </div>
                      </div>
                    </>)}
                        {/* <ModalFooter>
                        
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter> */}
             
              </form>
              </>
    </div>
  );
});

export default AddemissionsCloud;