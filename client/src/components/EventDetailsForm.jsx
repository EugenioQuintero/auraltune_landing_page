// src/components/EventDetailsForm.jsx

import React, { useState, useRef } from 'react';
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es'); // Set Day.js locale to Spanish

const libraries = ['places']; // Load the Places library

const EventDetailsForm = ({ eventDetails, setEventDetails }) => {
  const [isSecondFloor, setIsSecondFloor] = useState(eventDetails.isSecondFloor || false);
  const autocompleteRef = useRef(null); // Define the autocompleteRef

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({ ...eventDetails, [name]: type === 'checkbox' ? checked : value });

    if (name === 'isSecondFloor') {
      setIsSecondFloor(checked);
    }
  };

  // Handle place selected from autocomplete
  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address && place.geometry) {
        setEventDetails({
          ...eventDetails,
          location: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
        console.log('Event details updated:', eventDetails); // Optional
      } else {
        alert('Por favor, selecciona una dirección válida de la lista.');
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form className="space-y-6 mt-4">
        {/* Event Details Header */}
        <h2 className="text-2xl font-bold text-prussian-blue mb-6 text-center">
          Detalles del Evento
        </h2>

        {/* Event Location with Autocomplete */}
        <div>
          <label htmlFor="location" className="block text-lg font-medium text-gray-800">
            Ubicación del Evento
          </label>
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={onPlaceChanged}
            fields={['formatted_address', 'geometry']}
          >
            <input
              type="text"
              name="location"
              id="location"
              value={eventDetails.location || ''}
              onChange={handleChange}
              required
              placeholder="Escribe la dirección del evento"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-palatinate-blue focus:border-palatinate-blue text-lg"
            />
          </Autocomplete>
        </div>


        {/* Start Date and Time */}
        <div>
          <label htmlFor="startDateTime" className="block text-lg font-medium text-gray-800">
            Fecha y Hora de Inicio
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            id="startDateTime"
            value={eventDetails.startDateTime || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-palatinate-blue focus:border-palatinate-blue text-lg"
          />
        </div>

        {/* End Date and Time */}
        <div>
          <label htmlFor="endDateTime" className="block text-lg font-medium text-gray-800">
            Fecha y Hora de Fin
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            id="endDateTime"
            value={eventDetails.endDateTime || ''}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-palatinate-blue focus:border-palatinate-blue text-lg"
          />
        </div>

        {/* Number of Attendees */}
        <div>
          <label htmlFor="attendees" className="block text-lg font-medium text-gray-800">
            Número de Asistentes
          </label>
          <input
            type="number"
            name="attendees"
            id="attendees"
            value={eventDetails.attendees || ''}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-palatinate-blue focus:border-palatinate-blue text-lg"
            placeholder="Ejemplo: 150"
          />
        </div>

        {/* Event Type: Indoor or Outdoor */}
        <fieldset>
          <legend className="block text-lg font-medium text-gray-800">
            ¿El evento es interior o exterior?
          </legend>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="eventTypeInterior"
                name="eventType"
                type="radio"
                value="interior"
                checked={eventDetails.eventType === 'interior'}
                onChange={handleChange}
                required
                className="h-5 w-5 text-palatinate-blue focus:ring-palatinate-blue border-gray-300"
              />
              <label htmlFor="eventTypeInterior" className="ml-3 block text-lg text-gray-800">
                Interior
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="eventTypeExterior"
                name="eventType"
                type="radio"
                value="exterior"
                checked={eventDetails.eventType === 'exterior'}
                onChange={handleChange}
                required
                className="h-5 w-5 text-palatinate-blue focus:ring-palatinate-blue border-gray-300"
              />
              <label htmlFor="eventTypeExterior" className="ml-3 block text-lg text-gray-800">
                Exterior
              </label>
            </div>
          </div>
        </fieldset>

        {/* Is Event on Second Floor */}
        <div className="flex items-center">
          <input
            id="isSecondFloor"
            name="isSecondFloor"
            type="checkbox"
            checked={isSecondFloor}
            onChange={handleChange}
            className="h-5 w-5 text-palatinate-blue focus:ring-palatinate-blue border-gray-300 rounded"
          />
          <label htmlFor="isSecondFloor" className="ml-2 block text-lg text-gray-800">
            El evento es en un segundo piso
          </label>
        </div>

        {/* Additional Fields if Event is on Second Floor */}
        {isSecondFloor && (
          <div className="space-y-6">
            {/* Number of Floors */}
            <div>
              <label htmlFor="floors" className="block text-lg font-medium text-gray-800">
                Número de pisos
              </label>
              <input
                type="number"
                name="floors"
                id="floors"
                value={eventDetails.floors || ''}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-palatinate-blue focus:border-palatinate-blue text-lg"
                placeholder="Ejemplo: 2"
              />
            </div>

            {/* Is there an Elevator */}
            <fieldset>
              <legend className="block text-lg font-medium text-gray-800">
                ¿Hay elevador?
              </legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="elevatorYes"
                    name="elevator"
                    type="radio"
                    value="yes"
                    checked={eventDetails.elevator === 'yes'}
                    onChange={handleChange}
                    required
                    className="h-5 w-5 text-palatinate-blue focus:ring-palatinate-blue border-gray-300"
                  />
                  <label htmlFor="elevatorYes" className="ml-3 block text-lg text-gray-800">
                    Sí
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="elevatorNo"
                    name="elevator"
                    type="radio"
                    value="no"
                    checked={eventDetails.elevator === 'no'}
                    onChange={handleChange}
                    required
                    className="h-5 w-5 text-palatinate-blue focus:ring-palatinate-blue border-gray-300"
                  />
                  <label htmlFor="elevatorNo" className="ml-3 block text-lg text-gray-800">
                    No
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        )}
      </form>

    </div>
  );
};

export default EventDetailsForm;
