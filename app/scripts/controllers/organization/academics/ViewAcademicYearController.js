/**
 * @author : Ram
 */
(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewAcademicYearController: function (scope, routeParams, resourceFactory, $modal, location, route) {

            //Get academic year by ID
            resourceFactory.academicsValueResource.getAcademicvalues({academicYearId: routeParams.id}, function (data) {
                scope.academicYearData = data;
                if (data.status.value === "Pending for activation") {
                    scope.academicYearStatusPending = true;
                } else if (data.status.value === "Active") {
                    scope.academicYearStatusActive = true;
                } else if (data.status.value === "Deleted") {
                    scope.academicYearStatusDeleted = true;
                } else if (data.status.value === "Close"){
                    scope.academicYearStatusClosed = true;
                }

            });

            scope.activateAcademicYear = function () {
                $modal.open({
                    templateUrl: 'activateAcademicYear.html',
                    controller: activateAcademicYearCtrl
                });
            };

            var activateAcademicYearCtrl = function ($scope, $modalInstance) {
                $scope.activate = function () {
                    resourceFactory.academicsValueResource.save({academicYearId: routeParams.id, command: 'Activate'}, {}, function (data) {
                        $modalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };


            scope.closeAcademicYear = function () {
                $modal.open({
                    templateUrl: 'closeAcademicYear.html',
                    controller: closeAcademicYearCtrl
                });
            };

            var closeAcademicYearCtrl = function ($scope,  $modalInstance) {
                $scope.close = function () {
                    resourceFactory.academicsValueResource.save({academicYearId: routeParams.id, command: 'Close'}, {}, function (data) {
                        $modalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            scope.deleteAcademicYear = function () {
                $modal.open({
                    templateUrl: 'deleteAcademicYear.html',
                    controller: deleteAcademicYearCtrl
                });
            };

            var deleteAcademicYearCtrl = function ($scope,  $modalInstance) {
                $scope.delete = function () {
                    resourceFactory.academicsValueResource.delete({academicYearId: routeParams.id}, {}, function (data) {
                        $modalInstance.close('activate');
                        location.path('/academics');
                    });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        }
    });
    mifosX.ng.application.controller('ViewAcademicYearController', ['$scope', '$routeParams', 'ResourceFactory', '$modal', '$location', '$route', mifosX.controllers.ViewAcademicYearController]).run(function ($log) {
        $log.info("ViewAcademicYearController initialized");
    });
}(mifosX.controllers || {}));

