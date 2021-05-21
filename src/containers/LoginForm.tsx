import LoginButton from "../components/LoginButton"
import { makeStyles } from "@material-ui/core"
import { musicProvidersConfig } from "../utils"

interface ILoginForm {
   loginHandler: (provider: string) => () => void
   relevantProviders: string[]
}

const useStyles = makeStyles(() => ({
   root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
   },
   form: {
      display: "flex",
      gap: 8,
      flexDirection: "column"
   }
}))

const LoginForm = ({ relevantProviders, loginHandler }: ILoginForm) => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <div className={classes.form}>
            {relevantProviders?.map(provider => (
               <LoginButton
                  {...{
                     login: loginHandler(provider),
                     ...musicProvidersConfig[provider].layout
                  }}
                  key={provider}
               />
            ))}
         </div>
      </div>
   )
}

export default LoginForm
