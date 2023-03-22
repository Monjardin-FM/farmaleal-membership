import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import creditCards from "./assets/img/cards1.png";
import debitCards from "./assets/img/cards2.png";
import openpayLogo from "./assets/img/openpay.png";
import encrypt from "./assets/img/security.png";
import cardExample from "./assets/img/cvv.png";
import { AppFormLabel } from "./presentation/Components/AppFormLabel";
import { AppTextField } from "./presentation/Components/AppTextField";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { createMembership } from "./services/createMembership";
import { getEstados } from "./services/getEstados";
import { getCity } from "./services/getCity";
import { ApiKeyOpenPay, idOpenPay } from "../variables";

export const FormPayment = () => {
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
  const [estados, setEstados] = useState([
    {
      idEstado: 0,
      descripcion: "",
    },
  ]);
  const [municipios, setMunicipios] = useState([
    {
      idMunicipio: 0,
      descripcion: "",
    },
  ]);
  const [typeCard, setTypeCard] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [parent] = useAutoAnimate();
  const [idEstadoState, setIdEstadoState] = useState(33);
  const [idMunicipioState, setIdMunicipioState] = useState(0);
  const [information, setInformation] = useState({
    cargo: {
      name: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      idCiudad: idMunicipioState,
      idEstado: idEstadoState,
      postalCode: "",
      line1: "",
      cardNumber: "",
      holderName: "",
      expirationMonth: "",
      expirationYear: "",
      cvv2: "",
      mesesSI: "",
    },
    persona: {
      correo: "",
      nombre: "",
      paterno: "",
      materno: "",
      edad: "",
      sexo: "",
    },
    sessionId: paymentData.tokenId,
  });
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

  function sucessCallbak(response) {
    setPaymentData({
      ...paymentData,
      tokenId: response.data.id,
    });
    setTokenId(response.data.id);
  }

  const [stateName, setStateName] = useState("");
  const [municipioName, setMunicipioName] = useState("");
  useEffect(() => {
    console.log(information);
  }, [information]);
  useEffect(() => {
    const esta = getEstados();
    esta.then((response) => setEstados(response));
  }, []);
  useEffect(() => {
    const muni = getCity(idEstadoState);
    muni.then((response) => setMunicipios(response));
  }, [idEstadoState]);

  useEffect(() => {
    const s = estados.filter((element) => element.idEstado === idEstadoState);
    if (s.length > 0) {
      setStateName(s[0].descripcion);
      console.log(s[0].descripcion);
    }
    if (municipios.length > 0) {
      const m = municipios.filter(
        (element) => element.idMunicipio === idMunicipioState
      );
      if (m.length > 0) {
        setMunicipioName(m[0].descripcion);
      }
    }
  }, [idEstadoState, idMunicipioState]);
  useEffect(() => {
    setTokenId(tokenId);
    console.log(tokenId);
  }, [tokenId]);
  const handleSubmit = async (values) => {
    // handleData(values);
    const respuesta = await createMembership({
      cargo: {
        name: values.nombre,
        lastName: values.paterno,
        email: values.correo,
        city: municipioName,
        state: stateName,
        idCiudad: idMunicipioState.toString(),
        idEstado: idEstadoState.toString(),
        postalCode: values.postalCode,
        line1: values.line1,
        cardNumber: cardForm.card_number,
        holderName: cardForm.holder_name,
        expirationMonth: cardForm.expiration_month,
        expirationYear: cardForm.expiration_year,
        cvv2: cardForm.cvv2,
        mesesSI: values.mesesSI,
      },
      persona: {
        correo: values.correo,
        nombre: values.nombre,
        paterno: values.paterno,
        materno: values.materno,
        edad: values.edad.toString,
        sexo: values.sexo,
      },
      sessionId: paymentData.tokenId,
    });
    console.log(respuesta);
  };
  return (
    <Formik
      initialValues={{
        nombre: "",
        correo: "",
        paterno: "",
        materno: "",
        edad: "",
        sexo: "",
        city: "",
        state: "",
        postalCode: "",
        line1: "",
        mesesSI: 0,
      }}
      onSubmit={async (values) => {
        handlePayment();
        await setTimeout(function () {
          handleSubmit(values);
        }, 1500);
      }}
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
              <div>{tokenId}</div>
              <div className="col-span-3 w-full  flex flex-col gap-2 justify-center items-start">
                <AppFormLabel label="Nombre del titular:" />
                <AppTextField
                  dataOpenCard="holder_name"
                  name="holder_name"
                  onChange={handleChange}
                  placeholder="Como aparece en la tarjeta"
                  value={holder_name}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-3 flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Número de Tarjeta:" />
                <AppTextField
                  name="card_number"
                  value={card_number}
                  onChange={handleChange}
                  className="w-full"
                />
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
                  <div className="full">
                    <img src={cardExample} />
                  </div>
                </div>
              </div>
              <div className="w-full col-span-2 flex flex-col gap-2 justify-center items-start text-lg font-extralight">
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
                className="w-full col-span-2 flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                {typeCard.toString() === "2" && (
                  <>
                    <AppFormLabel label="Meses sin Intereses" />
                    <select
                      value={props.values.mesesSI}
                      onChange={props.handleChange}
                      name="mesesSI"
                    >
                      <option value="3">3 Meses sin Intereses</option>
                      <option value="6">6 Meses sin Intereses</option>
                      <option value="9">9 Meses sin Intereses</option>
                      <option value="12">12 Meses sin Intereses</option>
                    </select>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="gap-2 pt-2 grid grid-cols-12 mb-3">
              <div className="col-span-12 font-medium text-lg">
                Datos del Cliente
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Nombre(s):" />
                <AppTextField
                  value={props.values.nombre}
                  name="nombre"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Apellido Paterno:" />
                <AppTextField
                  placeholder=""
                  value={props.values.paterno}
                  name="paterno"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Apellido Materno:" />
                <AppTextField
                  placeholder=""
                  value={props.values.materno}
                  name="materno"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Calle:" />
                <AppTextField
                  placeholder=""
                  value={props.values.line1}
                  name="line1"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>

              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Código Postal:" />
                <AppTextField
                  placeholder="5 dígitos"
                  value={props.values.postalCode}
                  name="postalCode"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Estado:" />
                <select
                  value={props.values.state}
                  onChange={(ev) => {
                    props.handleChange(ev);
                    setIdEstadoState(parseInt(ev.target.value));
                  }}
                  name="state"
                >
                  <option>Estado</option>
                  {estados.map((item) => (
                    <option key={item.idEstado} value={item.idEstado}>
                      {item.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Ciudad:" />
                <select
                  value={props.values.city}
                  onChange={(ev) => {
                    props.handleChange(ev);
                    setIdMunicipioState(parseInt(ev.target.value));
                  }}
                  name="city"
                >
                  <option>Ciudad</option>
                  {municipios.map((item) => (
                    <option key={item.idMunicipio} value={item.idMunicipio}>
                      {item.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Correo Electrónico:" />
                <AppTextField
                  value={props.values.correo}
                  name="correo"
                  onChange={props.handleChange}
                  className="w-full"
                  type="email"
                />
              </div>
              <div className="w-full col-span-1  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Edad:" />
                <AppTextField
                  type="text"
                  value={props.values.edad}
                  name="edad"
                  onChange={props.handleChange}
                  className="w-full"
                />
              </div>
              <div className="w-full col-span-1  flex flex-col gap-2 justify-center items-start text-lg font-extralight">
                <AppFormLabel label="Sexo:" />
                <select
                  value={props.values.sexo}
                  name="sexo"
                  onChange={props.handleChange}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row   justify-start text-cyan-800 font-semibold divide-x-2 h-20 ">
              <div className="grid grid-cols-2 items-start">
                <div className="flex flex-col items-center justify-center text-cyan-800 font-semibold col-span-1">
                  <h4 className="text-xs">Tarjetas de crédito</h4>
                  <img src={creditCards} />
                </div>
                <div className="flex flex-col items-center justify-center text-cyan-800 font-semibold col-span-1">
                  <h4 className="text-xs">Tarjetas de débito</h4>
                  <img src={debitCards} />
                </div>
              </div>
              <div className="grid grid-cols-2 items-start">
                <div className="flex flex-col gap-2 p-2 justify-center items-center col-span-1">
                  <div>
                    <span className="text-xs">
                      Transacciones realizadas vía:
                    </span>
                  </div>
                  <div className="w-36">
                    <img src={openpayLogo} />
                  </div>
                </div>

                <div className="flex flex-row items-center   p-2 col-span-1">
                  <div className="w-24">
                    <img src={encrypt} />
                  </div>
                  <span className="text-xs text-start">
                    Tus pagos se realizan de forma segura con encriptación de
                    256 bits
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-sky-900 text-white px-10 py-3 hover:bg-sky-800 transition duration-200"
                id="pay-button"
              >
                Pagar
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
