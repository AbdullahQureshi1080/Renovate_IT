// Native Imports
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  Linking,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
  Touchable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Paragraph, Avatar, Divider, List} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';

// Components Imports
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import GallaryModal from '../../components/Modal/GallaryModal';
import ErrorMessage from '../../components/AppForm/ErrorMessage';

// Styles Imports
import ScreenStyles from '../../styles/ScreenStyles';

// Api Imports
import useApi from '../../hooks/useApi';
import userAPI from '../../api/user';
import {bindActionCreators} from 'redux';
import ViewBidModal from '../../components/Modal/ViewBidModal';
import NewBidModal from '../../components/Modal/NewBidModal';
import BidCard from '../../components/Card/BidCard';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

import notificationAPI, {
  getAllTokens,
  getAllTokensExceptUser,
  getToken,
  sendNotification,
} from '../../api/notification';

const PostDetailsScreen = ({navigation, route}) => {
  const notificationsApi = useApi(notificationAPI.addNewNotification);

  const [recievers, setRecievers] = useState([]);
  console.log('Recievers', recievers);
  const gettingTokens = async (userId) => {
    const Alltokens = await getToken(userId);
    // const specificTokens = await getAllTokensExceptUser();
    setRecievers(...recievers, Alltokens);
    // console.log('All tokens ', Alltokens);
  };

  // ----
  const allusers = useSelector((state) => state.entities.data.allusers);

  // -----
  // const [userPostIds, setUserPostIds] = useState([]);
  const [idCheck, setCheckId] = useState(true);
  const [deleteError, setDeleteError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bidModal, setBidModal] = useState(false);
  const [newBidVisible, setNewBidVisible] = useState(false);
  const [selectedBid, setSelectedBid] = useState([]);
  const [colorRed, setColorRed] = useState(false);
  const [arcExpanded, setArcExpanded] = useState(false);
  const [buildExpanded, setBldExpanded] = useState(false);
  const [supplierExpanded, setSupExpanded] = useState(false);
  const state = useSelector((state) => state);
  const user = state.entities.auth.data;
  const userEmail = state.entities.auth.data.email;
  const userId = state.entities.auth.data._id;
  const deleteApi = useApi(userAPI.deletePost);
  const acceptBidApi = useApi(userAPI.acceptBid);
  const rejectBidApi = useApi(userAPI.rejectBid);
  const withdrawBidApi = useApi(userAPI.withdrawBid);
  const bidsApi = useApi(userAPI.getPostBids);
  const newBidApi = useApi(userAPI.offerNewBid);
  const saveApi = useApi(userAPI.saveItem);
  const postId = route.params.item._id;
  // const postApi = useApi(userAPI.userPosts);
  // const userPostIds = state.entities.auth.data.posts.map(({id}) => id);
  const userPostIds = route.params.userPostIds;
  const [bids, setBids] = useState([]);

  const userBids = bids?.filter((bid) => {
    return bid.bidderId == userId;
  });

  // const [message, setMessage] = useState('');
  // const [amount, setAmount] = useState('');
  // const fetchUserPostIds = async () => {
  //   // User Post Ids
  //   const result = await postApi.request(userEmail);
  //   if (result.length == 0) {
  //     console.log('Post Ids not available');
  //   }
  //   setUserPostIds(result);
  // };

  const [arcBids, setArcBids] = useState([]);
  const [bldBids, setBldBids] = useState([]);
  const [supBids, setSupBids] = useState([]);
  const [arcBidsTimer, setArcBidsTimer] = useState(null);
  const [bldBidsTimer, setBldBidsTimer] = useState(null);
  const [supBidsTimer, setSupBidsTimer] = useState(null);
  const [arcBidsDuration, setArcBidsDuration] = useState(null);
  const [bldBidsDuration, setBldBidsDuration] = useState(null);
  const [supBidsDuration, setSupBidsDuration] = useState(null);
  // .filter((bid) => {
  //     return bid.bidderId == userId;
  //   });

  useEffect(() => {
    // fetchUserPostIds();
    fetchPostBids();
    console.log('Item Params', route.params.item);
    console.log(userPostIds);
    console.log(postId);
    console.log(arcBids);
    for (var i = 0; i < userPostIds.length; i++) {
      if (postId == userPostIds[i]) {
        setCheckId(false);
      }
    }

    // console.log(route.params.item.images)
  }, []);

  const fetchPostBids = async () => {
    const result = await bidsApi.request(postId);
    if (!result.ok) {
      console.log('Error fetching bids');
      return;
    }

    setBids(result.data);

    const filteredArc = result.data.filter((bid) => {
      return bid.bidCategory == 'Architect';
    });

    const filteredBld = result.data.filter((bid) => {
      return bid.bidCategory == 'Builder';
    });

    const filteredSup = result.data.filter((bid) => {
      return bid.bidCategory == 'Supplier';
    });

    const sortedArc = filteredArc.sort((a, b) => {
      return a.bidAmount - b.bidAmount;
    });

    const sortedBld = filteredBld.sort((a, b) => {
      return a.bidAmount - b.bidAmount;
    });

    const sortedSup = filteredSup.sort((a, b) => {
      return a.bidAmount - b.bidAmount;
    });
    if (sortedArc[0]) {
      setArcBidsTimer(sortedArc[0].date);
      setCountdown(sortedArc[0].date, setArcBidsDuration);
    }
    if (sortedBld[0]) {
      setBldBidsTimer(sortedBld[0].date);
      setCountdown(sortedBld[0].date, setBldBidsDuration);
    }
    if (sortedSup[0]) {
      setSupBidsTimer(sortedSup[0].date);
      setCountdown(sortedSup[0].date, setSupBidsDuration);
    }

    setArcBids(sortedArc);
    setBldBids(sortedBld);
    setSupBids(sortedSup);
  };

  useEffect(() => {
    // if(timer){
    // setCountdown();
    // }
  }, [setCountdown]);

  // useEffect(()=>{},[])

  const handleUpdate = () => {
    //  Update Post
    navigation.navigate('Add', {
      screen: 'UpdatePost',
      params: route.params.item,
    });
  };

  const loadInBrowser = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  const handleDelete = () => {
    // delete post
    const result = deleteApi.request(userEmail, postId);
    if (!result.ok) {
      console.log('Could Not Delete Post');
      setDeleteError('Error Deleting Post');
    }
    console.log('PostDeleted');
    navigation.reset({
      index: 0,
      routes: [{name: 'AppHome'}],
    });
  };

  const bidHandler = (item) => {
    const bidder = allusers.filter((user) => {
      return user._id == item.bidderId;
    });

    console.log('Biddder in modal', bidder[0]);
    const modalData = {
      bidData: item,
      bidderData: bidder[0],
      calltoActionHideStatus: idCheck,
    };

    setSelectedBid(modalData);
    setBidModal(true);
  };

  const styleforstatusRed = {
    color: '#F16174',
  };
  const styleforstatusGreen = {
    color: '#329E4B',
  };
  const styleforstatusActive = {
    color: '#0F4C75',
  };

  const [duration, setDuration] = useState(null);

  const setCountdown = (timer, setTimer) => {
    if (timer) {
      console.log('GOT TIMER: ', timer);
      var expirydate = moment(timer).add(2, 'minutes');
      //Let suppose we have to show the countdown for above date-time
      console.log('EXPIRY: ', expirydate);
      var date = moment();
      // var diffr = moment.duration(moment(expirydate).diff(moment(date)));
      console.log('DATE: ', date);
      var diffr = moment.duration(moment(expirydate).diff(moment(date)));

      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());
      var d = hours * 60 * 60 + minutes * 60 + seconds;
      console.log('DURATION IS ', d);
      //converting in seconds
      setTimer(d);
    }
  };

  const handleStatus = (status) => {
    if (status.toLowerCase() == 'accepted') {
      return styleforstatusGreen;
    } else if (status.toLowerCase() == 'rejected') {
      return styleforstatusRed;
    } else if (status.toLowerCase() == 'active') {
      return styleforstatusActive;
    }
  };

  const handleAllNotifications = async (users) => {
    const notification = {
      body: `New bid by ${user.firstname}`,
      title: `New bid by ${user.firstname}`,
      // image: data.gallaryImages[0].value,
    };
    let dataNotify = {
      body: `New bid by ${user.firstname}`,
      title: `New bid by ${user.firstname}`,
    };

    console.log(' Recievers :', recievers);
    const send = await sendNotification(recievers, notification, dataNotify);

    console.log(' Message from FCM :', send);
    // for (var i = 0; i < firmMembers.length; i++) {
    let messageNot = `New bid by ${user.firstname}`;
    console.log('Message for notification', messageNot);
    // const posterId = allusers.filter((user) => {
    //   return user.posts.includes(postId);
    // });
    // let users = [];
    const resultToSave = await notificationsApi.request(
      userId,
      messageNot,
      users,
    );
    if (!resultToSave.ok) {
      return Alert.alert('Its not working, notifications');
    }
    fetchPostBids();
    setNewBidVisible(false);
    setRecievers([]);
  };

  const newBidHandler = async (values) => {
    let bidderId = userId;
    let message = values.message;
    let bidAmount = values.amount;
    let bidCategory = values.category.label;
    let bidTime = new Date();
    console.log('bidCategory', bidCategory);
    const result = await newBidApi.request(
      bidderId,
      postId,
      message,
      bidAmount,
      bidCategory,
      bidTime,
    );
    if (!result.ok) {
      console.log(result.data);
      console.log('Error bidding');
      return;
    }
    Alert.alert('New Bid');

    const usersToNotify = bids.filter((bid) => {
      return bid.bidCategory == bidCategory;
    });

    console.log('Users to notify', usersToNotify);

    const userToNotifyIds = usersToNotify.map(({bidderId}) => bidderId);

    const userPostId = allusers.filter((user) => {
      // let userId = [];
      let postIds = user.posts.map(({id}) => id);
      for (var i = 0; i < postIds.length; i++) {
        if (postIds[i] == postId) {
          return user._id;
        }
      }
      // return userId;
    });

    console.log('Poster User Id', userPostId[0]._id);

    const notifyingIds = [...userToNotifyIds, userPostId[0]._id];

    console.log('Users Ids to notify', notifyingIds);

    for (var j = 0; j < notifyingIds.length; j++) {
      gettingTokens(notifyingIds[j]);
    }

    handleAllNotifications(notifyingIds);
  };

  const handleAcceptNotification = async (users) => {
    const notification = {
      body: `Bid Accepted in post ${route.params.item.title}`,
      title: `Bid Accepted in post ${route.params.item.title}`,
      // image: data.gallaryImages[0].value,
    };
    let dataNotify = {
      body: `Bid Accepted in post ${route.params.item.title}`,
      title: `Bid Accepted in post ${route.params.item.title}`,
    };

    console.log(' Recievers :', recievers);
    const send = await sendNotification(recievers, notification, dataNotify);

    console.log(' Message from FCM :', send);
    // for (var i = 0; i < firmMembers.length; i++) {
    let messageNot = `Bid Accepted in post ${route.params.item.title}`;
    console.log('Message for notification', messageNot);
    // const posterId = allusers.filter((user) => {
    //   return user.posts.includes(postId);
    // });
    // let users = [];
    const resultToSave = await notificationsApi.request(
      userId,
      messageNot,
      users,
    );
    if (!resultToSave.ok) {
      console.log('Error from notifications API', resultToSave.data);
      return Alert.alert('Its not working, notifications');
    }
    setRecievers([]);
  };

  const handleRejectNotification = async (users) => {
    const notification = {
      body: `Bid Rejected in post ${route.params.item.title}`,
      title: `Bid Rejected in post ${route.params.item.title}`,
      // image: data.gallaryImages[0].value,
    };
    let dataNotify = {
      body: `Bid Rejected in post ${route.params.item.title}`,
      title: `Bid Rejected in post ${route.params.item.title}`,
    };

    console.log(' Recievers :', recievers);
    const send = await sendNotification(recievers, notification, dataNotify);

    console.log(' Message from FCM :', send);
    // for (var i = 0; i < firmMembers.length; i++) {
    let messageNot = `Bid Rejected in ${route.params.item.title}`;
    console.log('Message for notification', messageNot);
    // const posterId = allusers.filter((user) => {
    //   return user.posts.includes(postId);
    // });
    // let users = [];
    const resultToSave = await notificationsApi.request(
      userId,
      messageNot,
      users,
    );
    if (!resultToSave.ok) {
      console.log('Error from notifications API', resultToSave.data);
      return Alert.alert('Its not working, notifications');
    }
    setRecievers([]);
  };

  const acceptHandler = async (selectedBid) => {
    // const bidId = selectedBid?.bidData._id;
    // console.log('Bid Id', bidId);
    const result = await acceptBidApi.request(selectedBid, postId);
    if (!result.ok) {
      console.log('Error accepting bid');
      return;
    }
    Alert.alert('Bid Accepted');
    let bidData = bids.filter((bid) => {
      return bid._id == selectedBid;
    });
    // console.log("bidData in acc",bidData);
    gettingTokens(bidData[0].bidderId);
    handleAcceptNotification([bidData[0].bidderId]);
    fetchPostBids();
    setBidModal(false);
  };

  const rejectHandler = async (selectedBid) => {
    // const bidId = selectedBid?.bidData._id;
    // console.log('Bid Id', bidId);
    const result = await rejectBidApi.request(selectedBid, postId);
    if (!result.ok) {
      console.log('Error accepting bid');
      return;
    }
    Alert.alert('Bid Rejected');
    let bidData = bids.filter((bid) => {
      return bid._id == selectedBid;
    });
    // console.log("bidData in acc",bidData);
    gettingTokens(bidData[0].bidderId);
    handleRejectNotification([bidData[0].bidderId]);
    fetchPostBids();
    setBidModal(false);
  };

  const withdrawHandler = async (selectedBid) => {
    const bidId = selectedBid?.bidData._id;
    console.log('Bid Id', bidId);
    const result = await withdrawBidApi.request(userId, postId, bidId);
    if (!result.ok) {
      console.log('Error withdrawing bid');
      return;
    }
    Alert.alert('Bid Widthdraw');
    fetchPostBids();
    setBidModal(false);
  };

  const onPressSave = async (image) => {
    console.log('Image for saving', image);
    let type = 'post';
    const result = saveApi.request(userId, image, type);
    if (!result.ok) {
      console.log('Not able to save at the moment');
    }
    console.log('Item Saved');
    setColorRed(true);
    Alert.alert('Item Saved');
  };

  return (
    <MenuProvider>
      <ScrollView style={ScreenStyles.postsDetailScreen}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="backspace"
              size={35}
              color="#1b262c"
            />
          </TouchableOpacity>
          {!idCheck ? (
            <View>
              <Menu>
                <MenuTrigger
                  text={
                    <MaterialIcons name="more-vert" size={40} color="#1b262c" />
                  }
                />
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption onSelect={handleUpdate} text={'Update'} />
                  <MenuOption
                    onSelect={() =>
                      Alert.alert(
                        'Delete',
                        'Are you sure you want to delete this post?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () =>
                              console.log('Cancel for post deletion'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: handleDelete},
                        ],
                        {cancelable: false},
                      )
                    }
                    text={'Delete'}
                  />
                </MenuOptions>
              </Menu>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <ErrorMessage error={deleteError} />
        <View style={ScreenStyles.postsDetailScreen.viewBox}>
          <View style={ScreenStyles.postsDetailScreen.AvatarBox}>
            <Avatar.Image
              source={{uri: route.params.item.creatorImage}}
              style={{
                marginHorizontal: 3,
              }}
            />
            <Text style={ScreenStyles.postsDetailScreen.AvatarBox.nameText}>
              {route.params.item.creator}
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            {idCheck ? (
              userBids.length == 0 ? (
                <AppButton name="Bid" onPress={() => setNewBidVisible(true)} />
              ) : (
                <AppButton
                  name="Bidded"
                  disabled={true}
                  // onPress={() => console.log('Bidded Button')}
                />
              )
            ) : (
              <View />
            )}
          </View>
        </View>
        <GallaryModal
          color={colorRed}
          isVisible={isVisible}
          images={route.params.item.images}
          onPressClose={() => setIsVisible(false)}
          onPressSave={(image) => onPressSave(image)}
        />
        <View
          style={{
            marginVertical: 15,
          }}
        >
          <Text style={ScreenStyles.postsDetailScreen.viewBox.titleText}>
            {route.params.item.title}
          </Text>
          <Paragraph style={ScreenStyles.postsDetailScreen.contentText}>
            {route.params.item.description}
          </Paragraph>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={ScreenStyles.postsDetailScreen.viewBox.titleText}>
              Budget
            </Text>
            <Text style={ScreenStyles.postsDetailScreen.viewBox.titleText}>
              RS {route.params.item.budget}{' '}
            </Text>
          </View>
        </View>

        <Text style={ScreenStyles.postsDetailScreen.viewBox.titleText}>
          Attachments
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          {route.params.item.images.map(
            (image, index) => (
              // <View style={styles.container}>
              <TouchableOpacity
                key={index}
                style={styles.container}
                onPress={() => setIsVisible(true)}
              >
                <Image source={{uri: image}} style={styles.image} />
              </TouchableOpacity>
            ),
            //  </View>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          {route.params.item.documents.map(
            (document, index) => (
              // <View style={styles.container}>
              <TouchableOpacity
                key={index}
                style={styles.container}
                onPress={() => loadInBrowser(document)}
              >
                <MaterialCommunityIcons
                  color="white"
                  name="pdf-box"
                  size={40}
                />
              </TouchableOpacity>
            ),
            //  </View>
          )}
        </View>
        <NewBidModal
          // bidData={selectedBid}
          isVisible={newBidVisible}
          onPressClose={() => setNewBidVisible(false)}
          onPressBid={(values) => newBidHandler(values)}
          // bidStatus={!message && !amount}
        />
        <ViewBidModal
          bidData={selectedBid}
          isVisible={bidModal}
          onPressClose={() => setBidModal(false)}
          onPressAccept={() => acceptHandler(selectedBid)}
          onPressReject={() => rejectHandler(selectedBid)}
          onPressWithdraw={() => withdrawHandler(selectedBid)}
        />
        <Divider style={styles.divider} />
        {!idCheck ? (
          <>
            <View style={styles.bidContainer}>
              <AppText style={ScreenStyles.postsDetailScreen.viewBox.titleText}>
                Bids
              </AppText>
            </View>
            <FlatList
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                >
                  <AppText style={{fontSize: 14}}>No Bids yet</AppText>
                </View>
              )}
              // horizontal={true}
              data={bids}
              keyExtractor={(bid) => bid._id}
              renderItem={({item}) => (
                <View style={styles.bidCardContainer} key={item._id}>
                  <BidCard
                    key={item._id}
                    data={item}
                    onPress={() => bidHandler(item)}
                    styleStatus={handleStatus(item.bidStatus)}
                  />
                </View>
              )}
            />
          </>
        ) : (
          <>
            <List.Section title="Bids">
              <List.Accordion
                title="Architects"
                left={(props) => <List.Icon {...props} icon="folder" />}
                expanded={arcExpanded}
                onPress={() => setArcExpanded(!arcExpanded)}
              >
                <>
                  {arcBidsDuration && (
                    <CountDown
                      until={arcBidsDuration}
                      timetoShow={('H', 'M', 'S')}
                      onFinish={() => {
                        if (arcBids[0].bidStatus !== 'Accepted') {
                          console.log('SELECTED BID: ', arcBids[0]);
                          acceptHandler(arcBids[0]._id);
                          for (let i = 1; i < arcBids.length; i++) {
                            rejectHandler(arcBids[i]._id);
                          }
                          setArcBidsTimer(0);
                        }
                      }}
                      onPress={() => alert('hello')}
                      size={20}
                    />
                  )}

                  <FlatList
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <AppText style={{fontSize: 14}}>No Bid yet</AppText>
                      </View>
                    )}
                    // horizontal={true}
                    data={arcBids}
                    keyExtractor={(bid) => bid._id}
                    renderItem={({item}) =>
                      item.bidCategory === 'Architect' ? (
                        <View style={styles.bidCardContainer} key={item._id}>
                          <>
                            <BidCard
                              data={item}
                              onPress={() => bidHandler(item)}
                              styleStatus={handleStatus(item.bidStatus)}
                            />
                          </>
                        </View>
                      ) : (
                        <></>
                      )
                    }
                  />
                </>
              </List.Accordion>

              <List.Accordion
                title="Builders"
                left={(props) => <List.Icon {...props} icon="folder" />}
                expanded={buildExpanded}
                onPress={() => setBldExpanded(!buildExpanded)}
              >
                <>
                  {bldBidsDuration && (
                    <CountDown
                      until={bldBidsDuration}
                      timetoShow={('H', 'M', 'S')}
                      onFinish={() => {
                        if (bldBids[0].bidStatus !== 'Accepted') {
                          console.log('SELECTED BID: ', bldBids[0]);
                          acceptHandler(bldBids[0]._id);
                          for (let i = 1; i < bldBids.length; i++) {
                            rejectHandler(bldBids[i]._id);
                          }
                          setBldBidsDuration(0);
                        }
                      }}
                      onPress={() => alert('hello')}
                      size={20}
                    />
                  )}

                  <FlatList
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <AppText style={{fontSize: 14}}>No Bid yet</AppText>
                      </View>
                    )}
                    // horizontal={true}
                    data={bldBids}
                    keyExtractor={(bid) => bid._id}
                    renderItem={({item}) =>
                      item.bidCategory === 'Builder' ? (
                        <View style={styles.bidCardContainer} key={item._id}>
                          <>
                            <BidCard
                              data={item}
                              onPress={() => bidHandler(item)}
                              styleStatus={handleStatus(item.bidStatus)}
                            />
                          </>
                        </View>
                      ) : (
                        <></>
                      )
                    }
                  />
                </>
              </List.Accordion>

              <List.Accordion
                title="Suppliers"
                left={(props) => <List.Icon {...props} icon="folder" />}
                expanded={supplierExpanded}
                onPress={() => setSupExpanded(!supplierExpanded)}
              >
                <>
                  {supBidsDuration && (
                    <CountDown
                      until={supBidsDuration}
                      timetoShow={('H', 'M', 'S')}
                      onFinish={() => {
                        if (supBids[0].bidStatus !== 'Accepted') {
                          console.log('SELECTED BID: ', supBids[0]);
                          acceptHandler(supBids[0]._id);
                          for (let i = 1; i < supBids.length; i++) {
                            rejectHandler(supBids[i]._id);
                          }
                          setSupBidsTimer(0);
                        }
                      }}
                      onPress={() => alert('hello')}
                      size={20}
                    />
                  )}

                  <FlatList
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}
                      >
                        <AppText style={{fontSize: 14}}>No Bid yet</AppText>
                      </View>
                    )}
                    // horizontal={true}
                    data={supBids}
                    keyExtractor={(bid) => bid._id}
                    renderItem={({item}) => (
                      <>
                        {item.bidCategory === 'Supplier' ? (
                          <View style={styles.bidCardContainer} key={item._id}>
                            <>
                              <BidCard
                                data={item}
                                onPress={() => bidHandler(item)}
                                styleStatus={handleStatus(item.bidStatus)}
                              />
                            </>
                          </View>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  />
                </>
              </List.Accordion>
            </List.Section>
          </>
        )}
      </ScrollView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  divider: {
    width: '100%',
    marginVertical: 20,
    borderWidth: 0.5,
  },
  bidContainer: {
    // width: '100%',
    // backgroundColor: 'red',
  },
  bidCardContainer: {
    // width: '65%',
    // flexDirection: 'row',
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#495464',
    padding: 5,
  },
  // optionsWrapper: {
  //   backgroundColor:"#F4F4F2",
  // },
  optionWrapper: {
    backgroundColor: '#495464',
    margin: 5,
  },
  // optionTouchable: {
  //   underlayColor: 'gold',
  //   activeOpacity: 70,
  // },
  optionText: {
    color: '#F4F4F2',
  },
};
export default PostDetailsScreen;
