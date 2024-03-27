const express= require('express');
const commonC=require("../controllers/commonController")
const router = express.Router()

router.get("/", commonC.dashboardFunction)
router.get("/findproject",commonC.findProjectFunction)
//router.post("/add-to-cart",commonC.addToCartFunction)
//Routes for project
router.get("/projectDetails", commonC.projectDetailsFunction)
router.get("/projectLanding",commonC.projectLandingFunction)
router.post("/cart-action",commonC.cartActionFunction)
router.post("/filter-project",commonC.filterFunction)
router.get("/cart",commonC.cartFunction)
router.post("/project",commonC.projectFunction)
router.get("/mailDetails/:id", commonC.mailDetailsFunction)
router.get("/signup", commonC.signUpFunction)
router.post("/signupsubmit", commonC.signUpSubmitFunction)
router.get("/updatepage", commonC.updatepageFunction)
router.post("/updateA", commonC.updateActionFunction)
router.get("/downloadFile/:id", commonC.fileDownloadFunction)
router.post("/delete-project", commonC.DeleteCartFunction)

module.exports= router;