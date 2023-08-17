import $Api from '../../configUtils/axiosConfigInstance'

function TestToken() {


    const test_token  = async () => {

        try{

        const response =  await $Api.post('/user/token/refresh/')

        if (response.status == 200) {

            console.log(response.data)

        }

        else {
            console.log(response.data)
        }

    }


    catch(e){
        console.log(e)
    }

        
    }




  return (
    <div>

        <button onClick={test_token}>Refresh</button>
    </div>
  )
}

export default TestToken