from cart import utils as cartutils


class CookieProcessingMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.
        response.set_cookie('cart_id', cartutils.set_cart_id(request))
        return response
