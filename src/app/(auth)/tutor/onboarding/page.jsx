"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion'


const schema = z.object({
    firstName: z.string().min(1, {message: "First name is required!"}),
    lastName: z.string().min(1,{message: "Last name is required!"}),
    phone: z.string().min(9,{message: "Phone number is required!"}),
    address: z.string().min(1, {message: "Address is required!"}),
    subject: z.string().min(1, {message: "Subject is required!"}),
    email: z.string().email( {message: "Email is required!"}),
    hourlyRate: z.number().min(1, {message: "Hourly rate is required!"}),
    availableDate: z.date({message: "Available date is required!"}),
    qualification: z.string().min(1, {message: "Qualification is required!"}),
    description: z.string().min(1, {message: "Description is required!"}),
    certificate : z.instanceof(File,{message:"Document is required!"})
})


const OnBoarding = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })


    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        occupation: '',
        completionDate: '',
        projectDetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const redoStep = () => {
        setStep(1);
    };

    const handleSubmits = (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <div className="relative min-h-screen flex bg-customLime">
            <div className="max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                {/*<div className="text-6xl font-BG  whitespace-pre-line text-center tracking-tighter">*/}
                {/*    Project Planner*/}
                {/*</div>*/}
                {/*<div className="mt-4 w-full h-2" style={{backgroundColor: '#e0cfc8'}}>*/}
                {/*    <div className="h-full bg-black rounded-3xl w-1/3"></div>*/}
                {/*</div>*/}

                <form onSubmit={onSubmit} className="flex flex-col gap-8 bg-white rounded-md h-4/5">
                    {step === 1 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12 space-y-2">
                            <div className="text-sm font-light text-gray-400 uppercase">
                                Step 1 of 3
                            </div>
                            <h1 className="text-lg font-bold">Profile Details</h1>
                            <p className="text-sm text-gray-500">If you meet EDWin&apos;s minimum requirements, complete
                                the registration form to register and proceed to create your profile on EDWin. Fields
                                marked with * are required to be completed.</p>

                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <InputField
                                    label="Firt name*"
                                    name="firstName"
                                    defaultValue=""
                                    register={register}
                                    error={errors?.firstName}
                                />

                                <InputField
                                    label="Last name*"
                                    name="lastName"
                                    defaultValue=""
                                    register={register}
                                    error={errors?.lastName}
                                />
                            </div>

                            <InputField
                                label="Phone number*"
                                name="phone"
                                defaultValue=""
                                register={register}
                                error={errors?.phone}
                            />

                            <InputField
                                label="Address*"
                                name="address"
                                defaultValue=""
                                register={register}
                                error={errors?.address}
                            />

                            <hr/>

                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input type="checkbox" id="check_1" required/>
                                <label htmlFor="check_1" className="text-sm text-gray-600">I acknowledge and agree that
                                    my registration as a tutor is subject to review and approval by EDWin&apos;s support
                                    team and I may be asked for further information or to verify details as part of the
                                    application process.</label>
                            </div>

                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input type="checkbox" id="check_2" required/>
                                <label htmlFor="check_2" className="text-sm text-gray-600">I have not been convicted or accused of nor have been involved in the commission of any criminal offences, including but not limited to events involving children that would make me unsuitable to or prohibit me from working with children.</label>
                            </div>

                            <div className="flex justify-end">
                                <button type="button" onClick={nextStep}
                                        className="mt-4 bg-black text-white font-bold py-2 px-4 rounded">
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-sm font-light text-gray-400 uppercase">
                                Step 2 of 3
                            </div>
                            {/*<div className="mt-4 w-full h-2" style={{backgroundColor: '#e0cfc8'}}>*/}
                            {/*    <div className="h-full bg-black rounded-3xl w-2/3"></div>*/}
                            {/*</div>*/}
                            <h1 className="text-lg font-bold">Subject & Experience</h1>
                            <InputField
                                label="Subject*"
                                name="subject"
                                defaultValue=""
                                register={register}
                                error={errors?.subject}
                            />
                            <InputField
                                label="Qualification*"
                                name="qualification"
                                defaultValue=""
                                register={register}
                                error={errors?.qualification}
                            />

                            <div>
                                <label>
                                    <h2>Upload a certificate</h2>
                                    <span className="text-sm text-gray-600">Upload certificate relate to the subject. Uploading certificates will a good way to gain trust by students and administration. <br/> Format - JPG, PNG or PDF, Maximum size 10 MB.</span>
                                </label>
                                <input type="file" {...register("certificate")} />
                                {errors.certificate?.message && (
                                    <p className="text-xs text-red-400">{errors.certificate.message.toString()}</p>
                                )}
                            </div>

                            <div className="flex justify-between mt-12">

                                <button type="button" onClick={prevStep}
                                        className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded">
                                    Previous
                                </button>
                                <button type="button" onClick={nextStep}
                                        className=" bg-black text-white font-bold py-2 px-4 rounded">
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-base font-light text-center  ">
                                Step 3/3
                            </div>
                            <div className="mt-4 w-full h-2" style={{backgroundColor: '#e0cfc8'}}>
                                <div className="h-full bg-black rounded-3xl w-3/3"></div>
                            </div>
                            <div className="mt-12 text-3xl  text-center">
                                Give us the deets!
                            </div>
                            <div>
                                <textarea
                                    type="text"
                                    placeholder="Please provide a summary of your project"
                                    name="projectDetails" // This should match your formData property
                                    className="mt-4 border border-gray-400 w-full rounded-md px-4 py-3 focus:outline-none "
                                    rows={8} // Specify the number of rows here
                                    style={{backgroundColor: '#e0cfc8'}}
                                    value={formData.projectDetails} // This should point to formData.number
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex justify-center mt-12">

                                <button type="button" onClick={prevStep}
                                        className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded">
                                    Previous
                                </button>
                                <button type="submit" onClick={nextStep}
                                        className=" bg-black text-white font-bold py-2 px-4 rounded">
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="mt-12 text-base  text-center">
                                Your submission has been received! We will aim to get back to you within 3 working days.
                            </div>
                            <div>
                                <div className="flex justify-center mt-12">
                                    <button type="submit" onClick={redoStep}
                                            className=" bg-black text-white font-bold py-2 px-4 rounded">
                                        Redo the planner
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default OnBoarding;