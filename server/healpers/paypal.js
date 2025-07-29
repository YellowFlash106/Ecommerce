const paypal = require("paypal-rest-sdk")

paypal.configure({
    mode: "sandbox",
    client_id:"AaWrq_Y7wLjP46cacDAN_GnzX3caPJsRTGpuqmXJXPMIhirPZsxd0VcqvDz4mRU3ZWe_pof4XCIbeacI",
    client_secret: "EINbM6i1P7jipjM5mt3oYPKtffj0hf2A1CunAvleVawUgTPUs7HXM3QvVFtpqGa5Drr1oiBW74pNYRDt"
});

module.exports = paypal;
// PAYPAL_CLIENT_ID=ATV8zhvYiX9aBShERGXir_fOX_iZZDQvtxj-mLaY2MLB2lmJtzM71H_XYnKPj9BxNNX9TcjdFJA2Uwkk
// PAYPAL_CLIENT_SECRET=EApfem6hqeMnehOPSyYcF8r60kXi-FODeuxz9phkhN6iWWDihJAlHrRFu_btt47CTQtIUdBq-CW-P-Fr