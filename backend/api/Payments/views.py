from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
import stripe
from stripe.error import StripeError

stripe.api_key = 'sk_test_51NZvvaDVVuAHEldZmTso6fI7SZe6XUfE9xE4Pjg4mKDtLYmN4xHVuLbOaymKjtj6zK8ipsQgdg3ZwWBwaNSTLZGl00weJjmnrs'


@extend_schema(tags=["Payments"])
@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@extend_schema(tags=["Payments"])
@api_view(['POST'])
def create_subscription(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    price_id = 'price_1NZwWbDVVuAHEldZLxteY7HI'  # Идентификатор цены 

    try:
        # Создаем нового пользователя в системе, используя указанный email и id платежного метода
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)

        payment_intent = stripe.PaymentIntent.create(
            customer=customer.id,
            payment_method=payment_method_id,
            currency='rub',  # Валюта - рубли
            amount=4900,  # 49 рублей
            description='Покупка подписки Осирис Плюс'
        )

        return Response(status=status.HTTP_200_OK,
                        data={'message': 'Success', 'data': {
                            'customer_id': customer.id, 'subscription_id': payment_intent.subscription, 'amount': 4900}
                              })

    except StripeError as e:
        error_msg = str(e)
        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data={'message': 'Error', 'error': error_msg})

    except Exception as e:
        error_msg = str(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        data={'message': 'Internal Server Error', 'error': error_msg})
