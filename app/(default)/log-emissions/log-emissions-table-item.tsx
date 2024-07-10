import { co2Emission } from './log-emissions-table'
// import { deleteLogEmission } from "@/app/lib/actions";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

interface Co2EmissionsTableItemProps {
  co2emission: co2Emission
  count: number
  onCheckboxChange: (id: number, checked: boolean) => void
  isSelected: boolean
}

export default function Co2EmissionsTableItem({ co2emission, onCheckboxChange, isSelected }: Co2EmissionsTableItemProps) {
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
    onCheckboxChange(co2emission.id, e.target.checked)
  }

  console.log(co2emission)

  const handleDelete = async () => {
    if (co2emission.id === 0) return;

    try {
      // await deleteLogEmission({ ids: co2emission.id });
       // Clear selected items after deletion
    } catch (error) {
      console.error("Error deleting Private Emission Factor:", error);
    }
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input className="form-checkbox" type="checkbox" onChange={handleCheckboxChange} checked={isSelected} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.Name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.sector}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.category}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.region}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.year}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.co2e}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{co2emission.co2e_unit}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* <button onClick={onOpen} className="btn hover:bg-indigo-400 text-slate-800 dark:text-slate-100">
        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" 
        fill="#0D0D0D"/></svg>
        </button> */}
        <button onClick={onOpen} className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600">
          <svg className="w-3 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
            <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
          </svg>
        </button>
        
        
         {/* Modal backdrop animation */}
            <Modal 
            size='md'
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
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 font-bold">Are you absolutely sure?</ModalHeader>
                    <ModalBody>
                      <p className='font-medium'>
                      This action cannot be undone. This will permanently delete your emission.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <form onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        handleDelete(); // Call deleteApikey with an object containing the array of selectedItems
                      }}>
                        <Button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer">
                          Confirm
                        </Button>
                      </form>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
      </td>
    </tr>
  )
}