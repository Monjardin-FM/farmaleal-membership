import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { AppTextField } from "./presentation/Components/AppTextField";
import { AppFormLabel } from "./presentation/Components/AppFormLabel";
import { ApiKeyOpenPay, idOpenPay } from "../variables";
import cardExample from "./assets/img/cvv.png";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Swal from "sweetalert2";
import { FooterModal } from "./FooterModal";

export const ModalVerificationCard = ({ isVisible, onClose, nextForm }) => {
  const [paymentData, setPaymentData] = useState({
    deviceSessionId: "",
    tokenId: "",
  });
  const [cardForm, setCardForm] = useState({
    card_number: "",
    holder_name: "",
    expiration_year: "",
    expiration_month: "",
    cvv2: "",
  });
  const [tokenId, setTokenId] = useState("");
  const [flagCardNumberValid, setFlagCardNumber] = useState(false);
  const [typeCard, setTypeCard] = useState("");
  const [parent] = useAutoAnimate();

  useEffect(() => {
    /*global OpenPay*/
    OpenPay.setId(idOpenPay);
    OpenPay.setApiKey(ApiKeyOpenPay);
    OpenPay.setSandboxMode(true);
    //Se genera el id de dispositivo
    setPaymentData({
      ...paymentData,
      deviceSessionId: OpenPay.deviceData.setup(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { card_number, cvv2, expiration_month, expiration_year, holder_name } =
    cardForm;

  const handleSubmit = () => {
    handlePayment();
  };

  const handleChange = (e) => {
    setCardForm({
      ...cardForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    createToken();
  };

  const createToken = () => {
    OpenPay.token.create(cardForm, sucessCallbak, console.log);
  };

  const sucessCallbak = (response) => {
    setPaymentData({
      ...paymentData,
      tokenId: response.data.id,
    });
    console.log(response);
    console.log(response.data.card.type);
    const token = response.data.id;
    setTokenId(token);

    Swal.fire({
      icon: "success",
      title: "Tarjeta Válida. Rellena los siguiente campos",
      showConfirmButton: false,
      timer: 1500,
    });
    nextForm();
  };
  const [CVV2Flag, setCVV2Flag] = useState();
  useEffect(() => {
    if (card_number.length >= 14) {
      const flagCardNumber = OpenPay.card.validateCardNumber(card_number);
      setFlagCardNumber(flagCardNumber);
    }
  }, [card_number]);
  useEffect(() => {
    const cvv2Flag = OpenPay.card.validateCVC(cvv2, card_number);
    setCVV2Flag(cvv2Flag);
  }, [cvv2]);

  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Formik
                  initialValues={{
                    mesesSI: "0",
                  }}
                  onSubmit={console.log("")}
                >
                  {(props) => (
                    <form
                      action="#"
                      method="POST"
                      id="paymentForm"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="pt-2">
                        <div className=" gap-2 rounded-lg pb-2 grid grid-cols-12">
                          <div className="col-span-12 font-medium text-lg">
                            Datos de tarjeta
                          </div>
                          <div
                            ref={parent}
                            className="col-span-3 w-full  flex flex-col gap-2 justify-center items-start"
                          >
                            <AppFormLabel label="Nombre del titular:" />

                            <AppTextField
                              dataOpenCard="holder_name"
                              name="holder_name"
                              onChange={handleChange}
                              placeholder="Como aparece en la tarjeta"
                              value={holder_name}
                              className="w-full"
                              onBlur={props.handleBlur}
                            />
                            {props.touched.holder_name &&
                              holder_name === "" && (
                                <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                  <span className="text-red-700 font-semibold text-sm">
                                    {"Campo Obligatorio"}
                                  </span>
                                </div>
                              )}
                          </div>
                          <div
                            ref={parent}
                            className="w-full col-span-3 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
                          >
                            <AppFormLabel label="Número de Tarjeta:" />
                            <AppTextField
                              placeholder={"0000 0000 0000 0000"}
                              name="card_number"
                              value={card_number}
                              onChange={(e) => {
                                props.handleChange(e);
                                handleChange(e);
                              }}
                              className="w-full"
                              onBlur={props.handleBlur}
                            />
                            {!flagCardNumberValid && (
                              <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                <span className="text-red-700 font-semibold text-sm">
                                  {"Tarjeta Inválida"}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="w-full col-span-3 flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                            <AppFormLabel label="Fecha de expiración:" />
                            <div className="flex flex-row gap-3 ">
                              <AppTextField
                                placeholder="Mes"
                                name="expiration_month"
                                value={expiration_month}
                                onChange={handleChange}
                                className="w-full"
                              />
                              <AppTextField
                                placeholder="Año"
                                name="expiration_year"
                                value={expiration_year}
                                onChange={handleChange}
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div className="w-full col-span-3 flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                            <AppFormLabel label="Código de seguridad:" />
                            <div className="flex flex-row items-center gap-2">
                              <AppTextField
                                placeholder="3 dígitos"
                                value={cvv2}
                                name="cvv2"
                                onChange={handleChange}
                                className="w-1/2 "
                              />
                              {!CVV2Flag && (
                                <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                  <span className="text-red-700 font-semibold text-sm">
                                    {"CVV Inválido"}
                                  </span>
                                </div>
                              )}
                              <div className="full">
                                <img src={cardExample} />
                              </div>
                            </div>
                          </div>
                          <div className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                            <AppFormLabel label="Tipo de Tarjeta" />
                            <select
                              value={typeCard}
                              onChange={(e) => setTypeCard(e.target.value)}
                            >
                              <option value="1">Tarjeta de Débito</option>
                              <option value="2">Tarjeta de Crédito</option>
                            </select>
                          </div>
                          <div
                            ref={parent}
                            className="w-full col-span-6 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
                          >
                            {typeCard.toString() === "2" && (
                              <>
                                <AppFormLabel label="Meses sin Intereses" />
                                <select
                                  value={props.values.mesesSI}
                                  onChange={props.handleChange}
                                  name="mesesSI"
                                  onBlur={props.handleBlur}
                                >
                                  <option value="0">Escoge una opción</option>
                                  <option value="3">
                                    3 Meses sin Intereses
                                  </option>
                                  <option value="6">
                                    6 Meses sin Intereses
                                  </option>
                                  <option value="9">
                                    9 Meses sin Intereses
                                  </option>
                                  <option value="12">
                                    12 Meses sin Intereses
                                  </option>
                                </select>
                                {props.errors.mesesSI &&
                                  props.touched.mesesSI && (
                                    <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                                      <span className="text-red-700 font-semibold text-sm">
                                        {props.errors.mesesSI}
                                      </span>
                                    </div>
                                  )}
                              </>
                            )}
                          </div>
                        </div>
                        <hr />
                        <FooterModal />
                        <hr />
                        <div className="flex justify-end mt-5">
                          <button
                            type="submit"
                            className="bg-sky-900 text-white px-10 py-3 hover:bg-sky-800 transition duration-200"
                            id="pay-button"
                            onClick={handleSubmit}
                          >
                            Verificar Tarjeta
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
