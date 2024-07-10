// This below check is added to avoid type script warnings and errors, remove this in future and fix all the type erros
// @ts-nocheck

"use client"


// server action to calculate and add co2 emissions to the table
import { addCo2eEmissions } from "../../../lib/actions";
import {categories, cloud_duration_unit} from "../../../utils/constants";
import {cloud_providers} from "../../../utils/constants";
import {sectors} from "../../../utils/constants";

import AddemissionsCloud from "./logemissions-cloud"
// import AddemissionsFreight from "./logemissions-freight" 

import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import ReactSelect from 'react-select';

const Addemissions =  () => {
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [Name, setName] = useState('');
  const [sectors_get, setSectors_get] = useState(['Information and Communication']);
  const [sector, setSector] = useState(['Information and Communication']);
  const [category, setCategory] = useState(['Cloud Computing - CPU']);
  const [category_get, setCategory_get] = useState(['Cloud Computing - CPU']);
  const [category_set, setCategory_set] = useState(['Cloud Computing - CPU']);
  // const [isModalOpen, setIsModalOpen] = useState(true);


  
  const handleChildSubmit = () => {
    console.log("Button clicked in Parent");
    if (childRef.current) 
      {
       childRef.current.formSubmitHandler();
    }
  };

  const childRef = useRef(null);

      // fetch sectors data from the emission_factors_wce table
      // useEffect(() => {
      //   fetch('/api/metadata/sectors')
      //     .then((res) => res.json())
      //     .then(sectors_get => {
      //       setSectors_get(sectors_get)
      //     })
          
      // }, [])  

      // sector = sectors_set

      console.log(sectors_get)

    //   useEffect(() => {
    //     if (sector) {
    //     fetch(`/api/metadata/category/${sector}`)
    //       .then((res) => res.json())
    //       .then(category_get => {
    //         setCategory_get(category_get)
    //       })
    //   }
    // },[sector]) 

    console.log(sectors_get)
    console.log(category_get)
    console.log(category_set)
    console.log(sector)

  console.log(sectors_get)
  console.log(category_get)
  return (
    <>
      <div>
        {/* <DatePickerWithRange /> */}
        {/* <Button onPress={onOpen} color="primary"><IoAddCircleOutline size={20}/>
          Log Emissions</Button>  */}
        <button
          onClick={onOpen}
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Add New</span>
        </button>
        <Modal
          size="4xl"
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          classNames={{
            backdrop:
              "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 w-96">
                  Log Emissions
                </ModalHeader>
                {/* <form onSubmit={formSubmitHandler} className='flex flex-col gap-6'> */}
                <ModalBody>
                  {/* Company Mail Address */}
                  {/* <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="company-name">Emission Name <span className="text-rose-500">*</span></label>
                      <input required id="Name" value={Name} onChange={(event) => setName(event.target.value)} className="form-input w-full" type="text"/>
                    </div> */}

                  <Input
                    autoFocus
                    size="lg"
                    name="Name"
                    placeholder="Enter Emission Name"
                    variant="bordered"
                    value={Name}
                    onChange={(event) => setName(event.target.value)}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />

                  <div className="flex flex-row gap-20">
                    {/* <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="sectors">Sector <span className="text-rose-500">*</span></label>
                      <ReactSelect 
                        id="sectors" 
                        options={sectors_get.map(sector => ({ label: sector.sector, value: sector.sector }))} 
                        onChange={(selectedOption) => setSector(selectedOption.value)} 
                        className="form-select w-full outline-none"
                        // styles={customStyles}
                      />
                    </div> */}

                    <div>
                      <Autocomplete
                        size="lg"
                        placeholder="Select a sector data"
                        className="w-96"
                        selectedKey={sector}
                        name="sectors"
                        variant="bordered"
                        value='Information and Communication'
                        onSelectionChange={setSector}
                        disabledKeys={[
                          "Materials and Manufacturing",
                          "Consumer Goods and Services",
                          "Health and Social Care",
                          "Refrigerants and Fugitive Gases",
                          "Waste",
                          "Education",
                          "Organizational Activities",
                          "Agriculture/Hunting/Forestry/Fishing",
                          "Equipment",
                          "Water",
                          "Restaurants and Accommodation",
                          "Buildings and Infrastructure",
                          "Insurance and Financial Services",
                        ]}
                        isRequired
                        allowsCustomValue={true}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                      >
                        {sectors.map((sector) => (
                          <AutocompleteItem
                            key={sector.sector}
                            value={sector.sector}
                          >
                            {sector.sector}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>

                    <div>
                      <Autocomplete
                        placeholder="Select a category"
                        size="lg"
                        className="w-96"
                        selectedKey={category_set}
                        name="category"
                        value={category_set}
                        onSelectionChange={setCategory_set}
                        disabledKeys={[
                          "Information and Communication Services",
                        ]}
                        isRequired
                        variant="bordered"
                        allowsCustomValue={true}
                        isDisabled={!sector?.length}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          border: "none",
                        }}
                      >
                        {category_get &&
                          category_get.map((category) => (
                            <AutocompleteItem
                              key={category.category}
                              value={category.category}
                            >
                              {category.category}
                            </AutocompleteItem>
                          ))}
                      </Autocomplete>
                    </div>
                  </div>

                  {/* {sector === 'Information and Communication' && (
                      <>
                    <AddemissionsCloud ref={childRef} sectorProp={sector} categoryProp={category_set} nameProp={Name} />
                    </>)} */}

                  <AddemissionsCloud
                    ref={childRef}
                    sectorProp={sector}
                    categoryProp={category_set}
                    nameProp={Name}
                  />
                  {/* {sector === 'Transport' && (
                       <>
                    <AddemissionsFreight ref={childRef} sectorProp={sector} categoryProp={category_set} nameProp={Name} />
                    </>)} */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    onPress={onClose}
                    onClick={handleChildSubmit}
                  >
                    Create
                  </Button>
                </ModalFooter>

                {/* </form> */}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
  
    
};

export default Addemissions;