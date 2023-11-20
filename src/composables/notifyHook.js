import { useQuasar } from 'quasar';


export const useNotify = () => {
  const $q = useQuasar();

  const errorNotify = (message = 'Error de servidor') => {
    $q.notify({
      message,
      color: 'negative',
      // icon: icon || 'report_problem'
    })
  }

  const successNotify = (message = 'Éxito') => {
    $q.notify({
      message,
      color: 'green',
      // icon: icon || 'report_problem'
    })
  }

  const showNotify = (message = 'Error de servidor', color = 'negative',icon) => {
    $q.notify({
      message,
      color,
      icon: icon || 'report_problem'
    })
  }
  return {
    showNotify,
    errorNotify,
    successNotify
  }

}
