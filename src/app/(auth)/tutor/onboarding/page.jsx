"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import InputField from "@/components/InputField";
import React, {useState} from 'react';
import {motion} from 'framer-motion'
import Image from "next/image";
import Link from "next/link";
import Upload from "@/components/Upload";
import AvailabilitySection from "@/components/AvailabilitySection";
import {useUser} from "@clerk/nextjs";

const schema = z.object({
    firstName: z.string().min(1, {message: "First name is required!"}),
    lastName: z.string().min(1, {message: "Last name is required!"}),
    phone: z.string().min(9, {message: "Valid phone number is required!"}),
    address: z.string().min(1, {message: "Address is required!"}),

    subjects: z.array(z.string().min(1, {message: "Subject is required!"})),
    // email: z.string().email({message: "Valid email is required!"}),
    hourlyRate: z.coerce.number().min(1, {message: "Hourly rate is required!"}),
    qualifications: z.array(
        z.object({
            courseName: z.string().min(1, {message: "Course name is required!"}),
            institute: z.string().min(1, {message: "Institute is required!"})
        })
    ).min(1, {message: "At least one qualification is required!"}),
    // description: z.string().min(1, {message: "Description is required!"}),
    // certificate: z.instanceof(File).refine(file => file.size <= 5 * 1024 * 1024, {
    //     message: "File size must be less than 5MB"
    // })
    //     .refine(file => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type), {
    //         message: "Only PDF, JPEG, and PNG files are allowed",
    //     })
    //     .refine(file => file !== undefined && file !== null, {
    //         message:"Certificate file is required!"
    //     }),
    certificateUrl: z.string().url().optional(),
    currency: z.enum(["LKR", "USD"], {message: "Currency is required!"}),
    availability: z.object({
        days: z.array(z.string().min(1, {message: "Availability days is required!"})),
        startTime: z.string().min(1, {message: "Start time is required!"}),
        endTime: z.string().min(1, {message: "End time is required!"}),
        preferredSlots: z.array(z.string()).optional(),
    }),

    subject: z.string().min(1, {message: "Subject is required!"}),
    email: z.string().email( {message: "Email is required!"}),
    hourlyRate: z.number().min(1, {message: "Hourly rate is required!"}),
    availableDate: z.date({message: "Available date is required!"}),
    // qualifications: z.string().min(1, {chat: "Qualification is required!"}),
    courseName:z.string().min(1, {message: "Course name is required!"}),
    institute:z.string().min(1, {message: "Institute is required!"}),
    description: z.string().min(1, {message: "Description is required!"}),
    certificate : z.instanceof(File,{message:"Document is required!"}),
    currency: z.enum(["LKR","USD"],{message:"Currency is required!"}),
})


const OnBoarding = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        trigger
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            subjects: [''],
            qualifications: [{courseName: '', institute: ''}],
            availability: {
                days: [],
                startTime: null,
                endTime: null,
                preferredSlots: []
            },
            certificate: null,
            certificateUrl: '',
        }
    });

    const [step, setStep] = useState(1);
    const [certificate, setCertificate] = useState(null);
    const [formData, setFormData] = useState(null);

    const {
        fields: subjectFields,
        append: appendSubject,
        remove: removeSubject
    } = useFieldArray({
        control,
        name: "subjects"
    });

    const {
        fields: qualificationsFields,
        append: appendQualification,
        remove: removeQualification
    } = useFieldArray({
        control,
        name: "qualifications"
    });

    const {user} = useUser();
    const userId = user?.id;

    const nextStep = async () => {
        let isValid = false;
        switch (step) {
            case 1:
                isValid = await trigger(["firstName", "lastName", "phone", "address"]);
                break;
            case 2:
                isValid = await trigger(["subjects", "qualifications"]);
                break;
            case 3:
                isValid = await trigger(["hourlyRate", "currency", "availability"]);
                break;
            default:
                isValid = true;
        }
        if (isValid) {
            const currentStepData = getValues();
            setFormData(prev => ({...prev, ...currentStepData}));
            setStep(prev => prev + 1);
        }
    }

    const prevStep = () => {
        setStep(step - 1);
    };

    const onSubmit = async (data) => {
        try {
            const submissionData = {
                ...formData,
                ...data,
                createdAt: new Date(),
                status: 'pending',
                userId: userId,
            };

            console.log(submissionData);
            setStep(4);
        } catch (err) {
            console.log("------------submit err: ", err);
        }
    };

    const handleCertificateUpload = (file) => {
        setCertificate(file);
        setValue('certificate', file);
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
                <form onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.error("---------------err: ", errors)
                })}
                      className="flex flex-col justify-center self-center gap-8 bg-white rounded-md h-4/5 w-4/5">
                    {step === 1 && (
                        <motion.div
                            key={step}
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
                                    label="First name*"
                                    name="firstName"
                                    register={register}
                                    error={errors?.firstName}
                                />
                                <InputField
                                    label="Last name*"
                                    name="lastName"
                                    register={register}
                                    error={errors?.lastName}
                                />
                            </div>
                            <InputField
                                label="Phone number*"
                                name="phone"
                                register={register}
                                error={errors?.phone}
                            />
                            <InputField
                                label="Address*"
                                name="address"
                                register={register}
                                error={errors?.address}
                            />
                            <hr/>
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input type="checkbox" id="check_1" required/>
                                <label htmlFor="check_1" className="text-sm text-gray-600">I understand that my tutor
                                    registration will be reviewed
                                    by EDWin&apos;s support team, and I may need to provide more information.</label>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 items-center">
                                <input type="checkbox" id="check_2" required/>
                                <label htmlFor="check_2" className="text-sm text-gray-600">I have not been convicted or
                                    accused of any crimes,
                                    including those involving children, that would make me unfit to work with
                                    them.</label>
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
                            key={step}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 self-center py-12">
                            <div className="text-sm font-light text-gray-400 uppercase">
                                Step 2 of 3
                            </div>
                            {/*<div className="mt-4 w-full h-2" style={{backgroundColor: '#e0cfc8'}}>*/}
                            {/*    <div className="h-full bg-black rounded-3xl w-2/3"></div>*/}
                            {/*</div>*/}
                            <h1 className="text-lg font-bold mt-2">Subjects & Qualifications</h1>
                            <div className="my-6 mb-5">
                                <h1 className="text-[14px] font-semibold">Subjects</h1>
                                <p className="text-sm text-gray-500">Add all the subjects you would like to offer
                                    tutoring for on EDWin.</p>
                                <ul className="my-3">
                                    {subjectFields.map((field, index) => (
                                        <li className="flex flex-col lg:flex-row gap-4 my-2" key={index}>
                                            <InputField
                                                label="Subject*"
                                                name={`subjects.${index}`}
                                                register={register}
                                                error={errors?.subjects?.[index]}
                                            />
                                            {subjectFields.length > 1 && (
                                                <div
                                                    onClick={() => removeSubject(index)}
                                                    className="px-2 py-1 bg-gray-200 rounded-full items-center self-end cursor-pointer"
                                                >
                                                    <svg width="20" height="28" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M17.8499 16.44C17.9445 16.5339 17.9978 16.6617 17.9978 16.795C17.9978 16.9283 17.9445 17.0561 17.8499 17.15L17.1499 17.85C17.056 17.9446 16.9282 17.9979 16.7949 17.9979C16.6615 17.9979 16.5337 17.9446 16.4399 17.85L11.9999 13.41L7.55985 17.85C7.46597 17.9446 7.33817 17.9979 7.20485 17.9979C7.07153 17.9979 6.94374 17.9446 6.84985 17.85L6.14985 17.15C6.0552 17.0561 6.00195 16.9283 6.00195 16.795C6.00195 16.6617 6.0552 16.5339 6.14985 16.44L10.5899 12L6.14985 7.55997C6.0552 7.46609 6.00195 7.33829 6.00195 7.20497C6.00195 7.07166 6.0552 6.94386 6.14985 6.84997L6.84985 6.14997C6.94374 6.05532 7.07153 6.00208 7.20485 6.00208C7.33817 6.00208 7.46597 6.05532 7.55985 6.14997L11.9999 10.59L16.4399 6.14997C16.5337 6.05532 16.6615 6.00208 16.7949 6.00208C16.9282 6.00208 17.056 6.05532 17.1499 6.14997L17.8499 6.84997C17.9445 6.94386 17.9978 7.07166 17.9978 7.20497C17.9978 7.33829 17.9445 7.46609 17.8499 7.55997L13.4099 12L17.8499 16.44Z"
                                                            fill="#212121"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className="py-2 rounded-md flex"
                                >
                                    <svg width="20" height="18" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3918_19)">
                                            <path
                                                d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z"
                                                fill="#0052EA"/>
                                        </g>
                                    </svg>
                                    <text className="text-sm font-medium text-blue-600 mx-1 cursor-pointer"
                                          onClick={() => appendSubject('')}>
                                        Add Subjects
                                    </text>
                                </div>
                            </div>
                            <div className="my-6 mb-5">
                                <h1 className="text-[14px] font-semibold">Qualification</h1>
                                <p className="text-sm text-gray-500">Add a course name and institute</p>
                                <ul className="my-3">
                                    {qualificationsFields.map((field, index) => (
                                        <li className="flex flex-col lg:flex-row gap-4 my-2" key={field.id}>
                                            <InputField
                                                label="Course title*"
                                                name={`qualifications.${index}.courseName`}
                                                register={register}
                                                error={errors.qualifications?.[index]?.courseName}
                                            />
                                            <InputField
                                                label="Institute*"
                                                name={`qualifications.${index}.institute`}
                                                register={register}
                                                error={errors.qualifications?.[index]?.institute}
                                            />
                                            {qualificationsFields.length > 1 && (
                                                <div
                                                    onClick={() => removeQualification(index)}
                                                    className="px-2 py-1 bg-gray-200 rounded-full items-center self-end cursor-pointer"
                                                >
                                                    <svg width="20" height="28" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M17.8499 16.44C17.9445 16.5339 17.9978 16.6617 17.9978 16.795C17.9978 16.9283 17.9445 17.0561 17.8499 17.15L17.1499 17.85C17.056 17.9446 16.9282 17.9979 16.7949 17.9979C16.6615 17.9979 16.5337 17.9446 16.4399 17.85L11.9999 13.41L7.55985 17.85C7.46597 17.9446 7.33817 17.9979 7.20485 17.9979C7.07153 17.9979 6.94374 17.9446 6.84985 17.85L6.14985 17.15C6.0552 17.0561 6.00195 16.9283 6.00195 16.795C6.00195 16.6617 6.0552 16.5339 6.14985 16.44L10.5899 12L6.14985 7.55997C6.0552 7.46609 6.00195 7.33829 6.00195 7.20497C6.00195 7.07166 6.0552 6.94386 6.14985 6.84997L6.84985 6.14997C6.94374 6.05532 7.07153 6.00208 7.20485 6.00208C7.33817 6.00208 7.46597 6.05532 7.55985 6.14997L11.9999 10.59L16.4399 6.14997C16.5337 6.05532 16.6615 6.00208 16.7949 6.00208C16.9282 6.00208 17.056 6.05532 17.1499 6.14997L17.8499 6.84997C17.9445 6.94386 17.9978 7.07166 17.9978 7.20497C17.9978 7.33829 17.9445 7.46609 17.8499 7.55997L13.4099 12L17.8499 16.44Z"
                                                            fill="#212121"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className="py-2 rounded-md flex"
                                >
                                    <svg width="20" height="18" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_3918_19)">
                                            <path
                                                d="M19 11.5V12.5C19 12.6326 18.9473 12.7598 18.8536 12.8536C18.7598 12.9473 18.6326 13 18.5 13H13V18.5C13 18.6326 12.9473 18.7598 12.8536 18.8536C12.7598 18.9473 12.6326 19 12.5 19H11.5C11.3674 19 11.2402 18.9473 11.1464 18.8536C11.0527 18.7598 11 18.6326 11 18.5V13H5.5C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V11.5C5 11.3674 5.05268 11.2402 5.14645 11.1464C5.24021 11.0527 5.36739 11 5.5 11H11V5.5C11 5.36739 11.0527 5.24021 11.1464 5.14645C11.2402 5.05268 11.3674 5 11.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V11H18.5C18.6326 11 18.7598 11.0527 18.8536 11.1464C18.9473 11.2402 19 11.3674 19 11.5Z"
                                                fill="#0052EA"/>
                                        </g>
                                    </svg>
                                    <text className="text-sm font-medium text-blue-600 mx-1 cursor-pointer"
                                          onClick={() => appendQualification({courseName: '', institute: ''})}>
                                        Add New Qualification
                                    </text>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label>
                                    <h2 className="text-[14px] font-semibold py-2">Upload a certificate</h2>
                                    <span className="text-[13px] text-gray-600">Upload certificate relate to the subject. Uploading certificates will a good way to gain trust by students and administration. Format - JPG, PNG or PDF, Maximum size 10 MB.</span>
                                </label>
                                <div className="items-center justify-center self-center my-4">
                                    <Upload setValue={setValue}/>
                                </div>
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
                            key={step}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-sm font-light text-gray-400 uppercase">
                                Step 3 of 3
                            </div>
                            <h1 className="text-lg font-bold mt-2">Rates & Availability</h1>
                            <div className="my-6 mb-5">
                                <h1 className="text-[14px] font-semibold">Pricing</h1>
                                <p className="text-sm text-gray-500">Enter your price</p>
                                <div className="flex flex-col md:flex-row my-2 gap-3">
                                    <InputField label="Hourly price*"
                                                name="hourlyRate"
                                                register={register}
                                                error={errors?.hourlyRate}
                                    />
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-xs text-gray-500">Currency*</label>
                                        <select
                                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                            {...register("currency")}
                                        >
                                            <option value="LKR">LKR</option>
                                            <option value="USD">USD</option>
                                        </select>
                                        {errors.currency?.message && (
                                            <p className="text-xs text-red-400">
                                                {errors.currency.message.toString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <AvailabilitySection control={control} errors={errors}/>
                            <div className="flex justify-between mt-12">
                                <button type="button" onClick={prevStep}
                                        className=" mr-4 bg-black text-white font-bold py-2 px-4 rounded">
                                    Previous
                                </button>
                                <button type="submit"
                                        className=" bg-black text-white font-bold py-2 px-4 rounded">
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key={step}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 w-3/5 mx-auto py-12 text-center">
                            <div className=" flex flex-col mt-12 items-center justify-center">
                                <Image src="/complete.png" alt="" height={72} width={72}/>
                                <h1 className="text-2xl p-2 mt-5 font-bold">Thank you!</h1>
                                <p className="text-gray-600">Thank you! EDWin will review your registration and will be
                                    in touch shortly.</p>
                            </div>
                            <div>
                                <div className="flex justify-center mt-12">
                                    <Link href="/portal/tutors">
                                        <button type="button"
                                                className=" bg-black text-white font-bold py-2 px-4 rounded">
                                            Close
                                        </button>
                                    </Link>
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