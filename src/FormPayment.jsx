import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";

import { AppFormLabel } from "./presentation/Components/AppFormLabel";
import { AppTextField } from "./presentation/Components/AppTextField";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { createMembership } from "./services/createMembership";
import { getEstados } from "./services/getEstados";
import { getCity } from "./services/getCity";
import * as Yup from "yup";
import { FooterModal } from "./FooterModal";
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
  const [stateName, setStateName] = useState("");
  const [municipioName, setMunicipioName] = useState("");
  const [flagCardNumberValid, setFlagCardNumber] = useState(false);

  const formSchema = Yup.object().shape({
    mesesSI: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Campo Obligatorio"),
    nombre: Yup.string().required("Campo Obligatorio"),
    paterno: Yup.string().required("Campo Obligatorio"),
    materno: Yup.string().required("Campo Obligatorio"),
    line1: Yup.string().required("Campo Obligatorio"),
    postalCode: Yup.string()
      .required("Campo Obligatorio")
      .length(5, "Codigo Postal Inválido")
      .matches(/^\d+$/, "Código Postal Inválido"),
    state: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Debes seleccionar un estado"),
    city: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Debes seleccionar una opción"),
    correo: Yup.string().email("Correo inválido").required("Campo Obligatorio"),
    edad: Yup.string()
      .required("Campo Obligatorio")
      .matches(/^\d+$/, "Edad inválida"),
    sexo: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Campo Obligatorio"),
  });

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

  const handleSubmit = async (values) => {
    console.log("Entrando handleSubmit");
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
      sessionId: tokenId,
    });
    console.log(respuesta);
  };

  return (
    <Formik
      initialValues={{
        holder_name: "",
        card_number: "",
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
        mesesSI: "0",
      }}
      validationSchema={formSchema}
      onSubmit={
        console.log("")
        // handleSubmit(values);

        // handleSubmit(values);
      }
    >
      {(props) => (
        <form
          action="#"
          method="POST"
          id="paymentForm"
          onSubmit={props.handleSubmit}
        >
          <div className="pt-2">
            <hr />
            <div className="gap-2 pt-2 grid grid-cols-12 mb-3">
              <div className="col-span-12 font-medium text-lg">
                Datos del Cliente
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Nombre(s):" />
                <AppTextField
                  value={props.values.nombre}
                  name="nombre"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.nombre && props.touched.nombre && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.nombre}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Apellido Paterno:" />
                <AppTextField
                  placeholder=""
                  value={props.values.paterno}
                  name="paterno"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.paterno && props.touched.paterno && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.paterno}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Apellido Materno:" />
                <AppTextField
                  placeholder=""
                  value={props.values.materno}
                  name="materno"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.materno && props.touched.materno && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.materno}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Calle:" />
                <AppTextField
                  placeholder=""
                  value={props.values.line1}
                  name="line1"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.line1 && props.touched.line1 && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.line1}
                    </span>
                  </div>
                )}
              </div>

              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Código Postal:" />
                <AppTextField
                  placeholder="5 dígitos"
                  value={props.values.postalCode}
                  name="postalCode"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.postalCode && props.touched.postalCode && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.postalCode}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Estado:" />
                <select
                  value={props.values.state}
                  onChange={(ev) => {
                    props.handleChange(ev);
                    setIdEstadoState(parseInt(ev.target.value));
                  }}
                  name="state"
                  onBlur={props.handleBlur}
                >
                  <option value="">Estado</option>
                  {estados.map((item) => (
                    <option key={item.idEstado} value={item.idEstado}>
                      {item.descripcion}
                    </option>
                  ))}
                </select>
                {props.errors.state && props.touched.state && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.state}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-3  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Ciudad:" />
                <select
                  value={props.values.city}
                  onChange={(ev) => {
                    props.handleChange(ev);
                    setIdMunicipioState(parseInt(ev.target.value));
                  }}
                  name="city"
                  onBlur={props.handleBlur}
                >
                  <option value={""}>Ciudad</option>
                  {municipios.map((item) => (
                    <option key={item.idMunicipio} value={item.idMunicipio}>
                      {item.descripcion}
                    </option>
                  ))}
                </select>
                {props.errors.city && props.touched.city && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.city}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Correo Electrónico:" />
                <AppTextField
                  value={props.values.correo}
                  name="correo"
                  onChange={props.handleChange}
                  className="w-full"
                  type="email"
                  onBlur={props.handleBlur}
                />
                {props.errors.correo && props.touched.correo && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.correo}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Edad:" />
                <AppTextField
                  type="text"
                  value={props.values.edad}
                  name="edad"
                  onChange={props.handleChange}
                  className="w-full"
                  onBlur={props.handleBlur}
                />
                {props.errors.edad && props.touched.edad && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.edad}
                    </span>
                  </div>
                )}
              </div>
              <div
                ref={parent}
                className="w-full col-span-2  flex flex-col gap-2 justify-center items-start text-lg font-extralight"
              >
                <AppFormLabel label="Sexo:" />
                <select
                  value={props.values.sexo}
                  name="sexo"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
                {props.errors.sexo && props.touched.sexo && (
                  <div className="border border-red-800 rounded-md bg w-full p-1 relative -top-2 bg-red-50">
                    <span className="text-red-700 font-semibold text-sm">
                      {props.errors.sexo}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <FooterModal />
            <hr />
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-sky-900 text-white px-10 py-3 hover:bg-sky-800 transition duration-200"
                id="pay-button"
                // onClick={handleSubmit}
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
