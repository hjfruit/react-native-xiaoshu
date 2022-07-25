import { attachPropertiesToComponent } from '../helpers'

import InitialValueProvider, {
  useInitialValue,
  useInitialProps,
} from './initial-value'

export default attachPropertiesToComponent(InitialValueProvider, {
  useInitialValue,
  useInitialProps,
})
