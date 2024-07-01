import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useState } from "react";
import ReactSelect from 'react-select';

const Addemissions = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Name, setName] = useState('');
  
  // Dummy data for sectors and categories
  const sectors_dummy = [
    { sector: "Energy" },
    { sector: "Transport" },
    { sector: "Manufacturing" },
    { sector: "Agriculture" }
  ];
  const categories_dummy = [
    { category: "Electricity" },
    { category: "Fuel" },
    { category: "Raw Materials" },
    { category: "Livestock" }
  ];

  const [sectors_get, setSectors_get] = useState(sectors_dummy);
  const [sector, setSector] = useState('');
  const [category, setCategory] = useState('');
  const [category_get, setCategory_get] = useState(categories_dummy);
  const [category_set, setCategory_set] = useState('');

  const handleChildSubmit = () => {
    console.log("Button clicked in Parent");
    console.log("Name:", Name);
    console.log("Sector:", sector);
    console.log("Category:", category_set);
  };

  return (
    <>
            <div>
        <button onClick={onOpen} className="btn bg-indigo-500 hover:bg-indigo-600 text-white flex items-center">
          <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Add New</span>
        </button>
        <Modal
          size='4xl'
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
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
            }
          }}
        >
          <ModalContent >
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 w-full items-center text-white">Log Emissions</ModalHeader>
                <ModalBody className="flex flex-col gap-6">
                  <input
                    // size="lg"
                    name='Name'
                    placeholder="Enter Emission Name"
                    // variant="flat"
                    value={Name}
                    onChange={(event) => setName(event.target.value)}
                    className="outline-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent rounded-lg p-3"
                
                  
                  />
                  <div className="flex flex-col gap-6">
                    <div>
                      <Autocomplete
                        size="lg"
                        label="Select a sector"
                        className="w-full"
                        selectedKey={sector}
                        name='sectors'
                        variant="bordered"
                        value={sector}
                        // onSelectionChange={(value) => setSector(value) as string}
                        isRequired
                        allowsCustomValue={true}
                        disabledKeys={['Materials and Manufacturing', 'Consumer Goods and Services', 'Health and Social Care', 'Refrigerants and Fugitive Gases', 'Waste','Education','Organizational Activities','Agriculture/Hunting/Forestry/Fishing','Equipment','Water', 'Restaurants and Accommodation','Buildings and Infrastructure', 'Insurance and Financial Services' ]}
                      >
                        {sectors_get.map((sector) => (
                          <AutocompleteItem key={sector.sector} value={sector.sector}>
                            {sector.sector}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                    <div>
                      <Autocomplete
                        label="Select a category"
                        size="lg"
                        className="w-full"
                        selectedKey={category_set}
                        name='category'
                        value={category_set}
                        // onSelectionChange={setCategory_set}
                        isRequired
                        variant="bordered"
                        allowsCustomValue={true}
                        isDisabled={!sector?.length}
                      >
                        {category_get && category_get.map((category) => (
                          <AutocompleteItem key={category.category} value={category.category}>
                            {category.category}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose} onClick={handleChildSubmit}>
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Addemissions;
