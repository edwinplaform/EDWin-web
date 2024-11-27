"use client"

import {Controller} from "react-hook-form";
import {TimePicker, Checkbox} from "antd";
import moment from "moment";

const AvailabilitySection = ({control, errors}) => {
    const daysOfWeek = [
        {value: 'monday', label: 'Monday'},
        {value: 'tuesday', label: 'Tuesday'},
        {value: 'wednesday', label: 'Wednesday'},
        {value: 'thursday', label: 'Thursday'},
        {value: 'friday', label: 'Friday'},
        {value: 'saturday', label: 'Saturday'},
        {value: 'sunday', label: 'Sunday'}
    ];

    const validateDays = (value) => {
        return value && value.length > 0 || "At least one day must be selected.";
    }

    const validateStartTime = (value) => {
        return value || "Start time is required!"
    }

    const validateEndTime = (value, formValues) => {
        const startTime = formValues.availability?.startTime;

        if (!value) return "End time is required!";

        if (startTime) {
            const start = moment(startTime, 'HH:mm');
            const end = moment(value, 'HH:mm');

            return end.isAfter(start) || "End time must be after start time";
        }

        return true;
    };

    return (
        <div className="my-6 mb-5">
            <h1 className="text-[14px] font-semibold">Availability</h1>
            <p className="text-sm text-gray-500">Select your available days and times</p>

            <div className="my-4">
                <h2 className="text-xs text-gray-600 mb-2">Available Days</h2>
                <div className="flex flex-wrap gap-3">
                    <Controller
                        name="availability.days"
                        control={control}
                        rules={{
                            validate: validateDays
                        }}
                        render={({field}) => (
                            <Checkbox.Group
                                options={daysOfWeek}
                                value={field.value}
                                onChange={field.onChange}
                                className="flex flex-wrap gap-3"
                            />
                        )}
                    />
                    {errors.availability?.days && (
                        <p className="text-xs text-red-400">
                            {errors.availability?.days.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row my-2 gap-3 justify-between">
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-gray-500">Start time*</label>
                    <Controller
                        name="availability.startTime"
                        control={control}
                        rules={{
                            validate: validateStartTime
                        }}
                        render={({field}) => (
                            <TimePicker
                                id="startTime"
                                format="HH:mm"
                                className="w-full"
                                onChange={(time, timeString) => field.onChange(timeString)}
                                value={field.value ? moment(field.value, 'HH:mm') : null}
                            />
                        )}
                    />
                    {errors.availability?.startTime && (
                        <p className="text-xs text-red-400">
                            {errors.availability?.startTime.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-gray-500">End time*</label>
                    <Controller
                        name="availability.endTime"
                        control={control}
                        rules={{
                            validate: validateEndTime
                        }}
                        render={({field}) => (
                            <TimePicker
                                id="endTime"
                                format="HH:mm"
                                className="w-full"
                                onChange={(time, timeString) => field.onChange(timeString)}
                                value={field.value ? moment(field.value, 'HH:mm') : null}
                            />
                        )}
                    />
                    {errors.availability?.endTime && (
                        <p className="text-xs text-red-400">
                            {errors.availability?.endTime.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-xs text-gray-600 mb-2">Preferred Teaching Slots</h2>
                <Controller
                    name="availability.preferredSlots"
                    control={control}
                    render={({field}) => (
                        <Checkbox.Group
                            options={[
                                {label: 'Morning', value: 'morning'},
                                {label: 'Afternoon', value: 'afternoon'},
                                {label: 'Evening', value: 'evening'}
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                            className="flex flex-wrap gap-3"
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default AvailabilitySection;
