"use client"

import {motion} from "framer-motion";
import InputField from "@/components/InputField";
import React, {useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUser} from "@clerk/nextjs";
import {z} from "zod";
import Image from "next/image";
import Link from "next/link";
import {role} from "@/util/Role";
import {message} from "antd";
import {useCreateUser, useUpgradeRole} from "@/hooks/useUsers";

const schema = z.object({
    firstName: z.string().min(1, {message: "First name is required!"}),
    lastName: z.string().min(1, {message: "Last name is required!"}),
    phone: z.string().min(9, {message: "Valid phone number is required!"}),
    address: z.string().min(1, {message: "Address is required!"}),
    subjects: z.array(z.string().min(1, {message: "Subject is required!"})),
});

const StudentOnboarding = () => {
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
        }
    });

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(null);

    const {
        fields: subjectFields,
        append: appendSubject,
        remove: removeSubject
    } = useFieldArray({
        control,
        name: "subjects"
    });

    const {user} = useUser();
    const userId = user?.id;

    const createUserMutation = useCreateUser();
    const upgradeRoleMutation = useUpgradeRole();

    const nextStep = async () => {
        let isValid = false;
        switch (step) {
            case 1:
                isValid = await trigger(["firstName", "lastName", "phone", "address", "subjects"]);
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
                userId: userId,
                role: role(user)
            };

            createUserMutation.mutate(submissionData, {
                onSuccess: () => {
                    console.log("user successfully created");

                    upgradeRoleMutation.mutate(
                        {userId: userId, role: role(user), isOnboarding: true},
                        {
                            onSuccess: () => {
                                console.log("User role upgraded successfully!");
                                setStep(2);
                            },
                            onError: (error) => {
                                console.error("Error upgrading role:", error);
                                message.error("Error upgrading role");
                            }
                        }
                    );
                },
                onError: (error) => {
                    console.error("Error creating user:", error);
                    message.error("Error creating user");
                }
            });

            // const response = await fetch(`${apiUrl}/users/`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(submissionData),
            // });
            //
            // const result = await response.json();
            // if (response.ok) {
            //     console.log("user successfully created: ", result);
            //     setStep(2);
            // } else {
            //     console.error("---------------error creating user: ", result.message);
            //     message.error("Error creating user")
            // }
        } catch (err) {
            console.log("------------submit err: ", err);
        }
    };

    return (
        <div className="relative min-h-screen flex bg-gradient-to-r from-purple-400 to-blue-500">
            <div className="max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                <form onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.error("---------------err: ", errors)
                })}
                      className="flex flex-col justify-center self-center gap-8 bg-white rounded-lg shadow-lg p-6">
                    {step === 1 && (
                        <motion.div
                            key={step}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="md:w-3/5 mx-auto py-12 space-y-2">
                            <div className="text-sm font-light text-gray-400 uppercase">
                                Step 1 of 2
                            </div>
                            <h1 className="text-lg font-bold">Student Profile Details</h1>
                            <p className="text-sm text-gray-500">Please fill in the details below to create your student
                                profile.
                                Fields marked with * are required.</p>
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
                            <div className="my-6 mb-5">
                                <h1 className="text-[14px] font-semibold">Preferred Subjects</h1>
                                <p className="text-sm text-gray-500">Select the subjects you would like to learn.</p>
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
                                                    className="px-2 py-1 bg-red-200 rounded-full items-center self-end cursor-pointer hover:bg-red-300 transition duration-200"
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
                            <div className="flex justify-end mt-12">
                                <button type="submit"
                                        className="mt-4 bg-red-100 text-red-400 font-bold py-2 px-4 rounded shadow hover:bg-red-200 transition duration-200">
                                    Submit
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
                            className="md:w-3/5 w-3/5 mx-auto py-12 text-center">
                            <div className=" flex flex-col mt-12 items-center justify-center">
                                <Image src="/complete.png" alt="" height={72} width={72}/>
                                <h1 className="text-2xl p-2 mt-5 font-bold text-gray-800">You&apos;re All Set!</h1>
                                <p className="text-gray-600">Congratulations! You&apos;ve successfully joined the EDWin
                                    community. Get ready to embark on your learning journey!</p>
                                <p className="text-gray-600 mt-4">Explore new subjects, connect with tutors, and unlock
                                    your potential!</p>
                            </div>
                            <div>
                                <div className="flex justify-center mt-12">
                                    <Link href="/portal/tutors">
                                        <button type="button"
                                                className="mt-4 bg-red-100 text-red-400 font-bold py-2 px-4 rounded shadow hover:bg-red-200 transition duration-200">
                                            Let&apos;s Go!
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

export default StudentOnboarding;